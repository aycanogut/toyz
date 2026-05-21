import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@react-email/render', () => ({
  render: vi.fn(async () => '<html>email</html>'),
}));

vi.mock('@/utils/extractLexicalText', () => ({
  default: vi.fn(() => 'Summary text.'),
}));

vi.mock('@/toyzConfig', () => ({
  default: {
    baseUrl: 'https://example.test',
  },
}));

import { dispatchNewsletterTask } from '@/app/(payload)/jobs/dispatchNewsletterTask';

type PayloadStub = ReturnType<typeof buildPayload>;

interface UpdateCall {
  collection: string;
  id: string;
  data: {
    status?: string;
    successCount?: number;
    failureCount?: number;
    recipientCount?: number;
    sentSubscribers?: string[];
  };
}

const lastUpdateCall = (payload: PayloadStub): UpdateCall => {
  const calls = payload.update.mock.calls as unknown[][];
  if (calls.length === 0) throw new Error('expected payload.update to be called');
  return calls[calls.length - 1][0] as UpdateCall;
};

const buildPayload = () => {
  const articles: Record<string, unknown> = {
    'article-1': {
      id: 'article-1',
      title: 'Hello',
      content: {},
      images: null,
      slug: 'hello',
      _status: 'published',
    },
  };

  return {
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    findByID: vi.fn(async ({ collection, id }: { collection: string; id: string }) => {
      if (collection === 'articles') return articles[id];
      return null;
    }),
    find: vi.fn(),
    update: vi.fn(async () => ({})),
    sendEmail: vi.fn(async () => ({})),
    _articles: articles,
  };
};

const runTask = (payload: PayloadStub, dispatchId: string, dispatch: unknown) => {
  const original = payload.findByID;
  payload.findByID = vi.fn(async (args: { collection: string; id: string; locale?: string }) => {
    if (args.collection === 'newsletter-dispatches' && args.id === dispatchId) {
      return dispatch as never;
    }
    return original(args as never);
  }) as never;

  return dispatchNewsletterTask.handler({
    input: { dispatchId },
    req: { payload: payload as never },
  });
};

describe('dispatchNewsletterTask', () => {
  beforeEach(() => {
    // make sleeps instant so tests don't wait 600ms per email
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('skips when dispatch status is sent', async () => {
    const payload = buildPayload();
    const dispatch = { id: 'd-1', article: 'article-1', status: 'sent', sentSubscribers: [] };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).not.toHaveBeenCalled();
    expect(payload.update).not.toHaveBeenCalled();
  });

  it('skips when dispatch status is disabled', async () => {
    const payload = buildPayload();
    const dispatch = { id: 'd-1', article: 'article-1', status: 'disabled', sentSubscribers: [] };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).not.toHaveBeenCalled();
  });

  it('sends email to each active subscriber and marks dispatch sent', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({
      docs: [
        { id: 'sub-1', email: 'a@test', preferredLocale: 'en' },
        { id: 'sub-2', email: 'b@test', preferredLocale: 'tr' },
      ],
    });

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'queued',
      sentSubscribers: [],
      successCount: 0,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).toHaveBeenCalledTimes(2);
    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.collection).toBe('newsletter-dispatches');
    expect(finalUpdate.data.status).toBe('sent');
    expect(finalUpdate.data.successCount).toBe(2);
    expect(finalUpdate.data.failureCount).toBe(0);
    expect(finalUpdate.data.sentSubscribers).toEqual(['sub-1', 'sub-2']);
  });

  it('skips subscribers already in sentSubscribers (resume on retry)', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({
      docs: [
        { id: 'sub-1', email: 'a@test', preferredLocale: 'en' },
        { id: 'sub-2', email: 'b@test', preferredLocale: 'en' },
      ],
    });

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'sending',
      sentSubscribers: ['sub-1'],
      successCount: 1,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).toHaveBeenCalledTimes(1);
    const firstSendArg = (payload.sendEmail.mock.calls as unknown[][])[0][0] as { to: string };
    expect(firstSendArg.to).toBe('b@test');

    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.data.successCount).toBe(2);
    expect(finalUpdate.data.sentSubscribers).toEqual(['sub-1', 'sub-2']);
  });

  it('counts failures and does not add failed subscriber to sentSubscribers', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({
      docs: [
        { id: 'sub-1', email: 'a@test', preferredLocale: 'en' },
        { id: 'sub-2', email: 'b@test', preferredLocale: 'en' },
      ],
    });
    payload.sendEmail
      .mockResolvedValueOnce({} as never)
      .mockRejectedValueOnce(new Error('SMTP down'));

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'queued',
      sentSubscribers: [],
      successCount: 0,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.data.successCount).toBe(1);
    expect(finalUpdate.data.failureCount).toBe(1);
    expect(finalUpdate.data.sentSubscribers).toEqual(['sub-1']);
    expect(finalUpdate.data.status).toBe('sent');
  });

  it('marks dispatch failed when every send fails', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({
      docs: [{ id: 'sub-1', email: 'a@test', preferredLocale: 'en' }],
    });
    payload.sendEmail.mockRejectedValue(new Error('nope'));

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'queued',
      sentSubscribers: [],
      successCount: 0,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.data.status).toBe('failed');
  });

  it('disables dispatch when article is no longer published', async () => {
    const payload = buildPayload();
    (payload._articles['article-1'] as { _status: string })._status = 'draft';
    payload.find.mockResolvedValue({
      docs: [{ id: 'sub-1', email: 'a@test', preferredLocale: 'en' }],
    });

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'queued',
      sentSubscribers: [],
      successCount: 0,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).not.toHaveBeenCalled();
    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.data.status).toBe('disabled');
  });

  it('finishes early with status sent and zero recipients when no active subscribers', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({ docs: [] });

    const dispatch = {
      id: 'd-1',
      article: 'article-1',
      status: 'queued',
      sentSubscribers: [],
      successCount: 0,
      failureCount: 0,
    };

    await runTask(payload, 'd-1', dispatch);

    expect(payload.sendEmail).not.toHaveBeenCalled();
    const finalUpdate = lastUpdateCall(payload);
    expect(finalUpdate.data.status).toBe('sent');
    expect(finalUpdate.data.recipientCount).toBe(0);
  });
});
