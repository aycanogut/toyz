import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { scheduleNewsletterDispatch } from '@/app/(payload)/utils/scheduleNewsletterDispatch';

const setNodeEnv = (value: string | undefined) => {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
};

const buildPayload = () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  create: vi.fn(),
  find: vi.fn(),
  update: vi.fn(),
  jobs: { queue: vi.fn() },
});

type PayloadStub = ReturnType<typeof buildPayload>;

interface HookArgs {
  doc: Record<string, unknown>;
  operation: 'create' | 'update' | 'delete';
  payload: PayloadStub;
}

// Wrap the strict CollectionAfterChangeHook signature so tests stay readable.
const callHook = async ({ doc, operation, payload }: HookArgs) => {
  const args = {
    doc,
    operation,
    req: { payload },
    previousDoc: {},
    collection: {},
    context: {},
    data: {},
  } as unknown as Parameters<typeof scheduleNewsletterDispatch>[0];
  return scheduleNewsletterDispatch(args);
};

const buildDoc = (overrides: Record<string, unknown> = {}) => ({
  id: 'article-1',
  title: 'Test article',
  _status: 'published',
  sendNewsletter: true,
  ...overrides,
});

describe('scheduleNewsletterDispatch', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    setNodeEnv('production');
  });

  afterEach(() => {
    setNodeEnv(originalEnv);
    vi.restoreAllMocks();
  });

  it('is a no-op outside production', async () => {
    setNodeEnv('development');
    const payload = buildPayload();

    await callHook({ doc: buildDoc(), operation: 'update', payload });

    expect(payload.create).not.toHaveBeenCalled();
    expect(payload.jobs.queue).not.toHaveBeenCalled();
  });

  it('is a no-op for non-create/update operations', async () => {
    const payload = buildPayload();

    await callHook({ doc: buildDoc(), operation: 'delete', payload });

    expect(payload.create).not.toHaveBeenCalled();
  });

  it('is a no-op when article is draft (autosave scenario)', async () => {
    const payload = buildPayload();

    await callHook({ doc: buildDoc({ _status: 'draft' }), operation: 'update', payload });

    expect(payload.create).not.toHaveBeenCalled();
    expect(payload.find).not.toHaveBeenCalled();
  });

  it('creates dispatch + queues job when published with sendNewsletter true', async () => {
    const payload = buildPayload();
    payload.create.mockResolvedValue({ id: 'dispatch-1' });

    await callHook({ doc: buildDoc(), operation: 'create', payload });

    expect(payload.create).toHaveBeenCalledOnce();
    const createCall = payload.create.mock.calls[0][0];
    expect(createCall.collection).toBe('newsletter-dispatches');
    expect(createCall.data.article).toBe('article-1');
    expect(createCall.data.status).toBe('queued');
    expect(typeof createCall.data.scheduledFor).toBe('string');

    expect(payload.jobs.queue).toHaveBeenCalledOnce();
    const queueCall = payload.jobs.queue.mock.calls[0][0];
    expect(queueCall.task).toBe('dispatchNewsletter');
    expect(queueCall.input).toEqual({ dispatchId: 'dispatch-1' });
    expect(queueCall.waitUntil).toBeInstanceOf(Date);
  });

  it('swallows E11000 duplicate-key errors silently (re-edit scenario)', async () => {
    const payload = buildPayload();
    const dupErr: Error & { code?: number } = Object.assign(new Error('E11000 duplicate key'), {
      code: 11000,
    });
    payload.create.mockRejectedValue(dupErr);

    await expect(
      callHook({ doc: buildDoc(), operation: 'update', payload })
    ).resolves.toBeDefined();

    expect(payload.logger.warn).toHaveBeenCalled();
    expect(payload.logger.error).not.toHaveBeenCalled();
    expect(payload.jobs.queue).not.toHaveBeenCalled();
  });

  it('swallows generic errors without throwing (save must not be blocked)', async () => {
    const payload = buildPayload();
    payload.create.mockRejectedValue(new Error('boom'));

    await expect(
      callHook({ doc: buildDoc(), operation: 'update', payload })
    ).resolves.toBeDefined();

    expect(payload.logger.error).toHaveBeenCalled();
    expect(payload.jobs.queue).not.toHaveBeenCalled();
  });

  it('disables an existing queued dispatch when sendNewsletter toggled off', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({ docs: [{ id: 'dispatch-1' }] });

    await callHook({
      doc: buildDoc({ sendNewsletter: false }),
      operation: 'update',
      payload,
    });

    expect(payload.find).toHaveBeenCalledOnce();
    expect(payload.update).toHaveBeenCalledWith({
      collection: 'newsletter-dispatches',
      id: 'dispatch-1',
      data: { status: 'disabled' },
    });
    expect(payload.create).not.toHaveBeenCalled();
  });

  it('does nothing when sendNewsletter false and no queued dispatch exists', async () => {
    const payload = buildPayload();
    payload.find.mockResolvedValue({ docs: [] });

    await callHook({
      doc: buildDoc({ sendNewsletter: false }),
      operation: 'update',
      payload,
    });

    expect(payload.update).not.toHaveBeenCalled();
  });
});
