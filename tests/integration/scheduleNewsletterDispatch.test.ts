import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { scheduleNewsletterDispatch } from '@/app/(payload)/utils/scheduleNewsletterDispatch';

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
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('is a no-op outside production', async () => {
    vi.stubEnv('NODE_ENV', 'development');
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

  it('creates dispatch + queues job 30 minutes out when published with sendNewsletter true', async () => {
    const now = new Date('2026-01-01T12:00:00.000Z');
    const sendAt = new Date('2026-01-01T12:30:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const payload = buildPayload();
    payload.create.mockResolvedValue({ id: 'dispatch-1' });

    await callHook({ doc: buildDoc(), operation: 'create', payload });

    expect(payload.create).toHaveBeenCalledWith({
      collection: 'newsletter-dispatches',
      data: {
        article: 'article-1',
        status: 'queued',
        scheduledFor: sendAt.toISOString(),
        triggeredAt: now.toISOString(),
      },
    });
    expect(payload.jobs.queue).toHaveBeenCalledWith({
      task: 'dispatchNewsletter',
      input: { dispatchId: 'dispatch-1' },
      waitUntil: sendAt,
    });
  });

  it.each([
    { name: 'error code 11000', error: Object.assign(new Error('write failed'), { code: 11000 }) },
    { name: 'E11000 in the message only', error: new Error('E11000 duplicate key error collection') },
  ])('skips with a warning on duplicate-key errors ($name, re-edit scenario)', async ({ error }) => {
    const payload = buildPayload();
    const doc = buildDoc();
    payload.create.mockRejectedValue(error);

    await expect(callHook({ doc, operation: 'update', payload })).resolves.toBe(doc);

    expect(payload.logger.warn).toHaveBeenCalledOnce();
    expect(payload.logger.error).not.toHaveBeenCalled();
    expect(payload.jobs.queue).not.toHaveBeenCalled();
  });

  it('swallows generic errors without throwing (save must not be blocked)', async () => {
    const payload = buildPayload();
    const doc = buildDoc();
    payload.create.mockRejectedValue(new Error('boom'));

    await expect(callHook({ doc, operation: 'update', payload })).resolves.toBe(doc);

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

    expect(payload.find).toHaveBeenCalledWith({
      collection: 'newsletter-dispatches',
      where: {
        and: [{ article: { equals: 'article-1' } }, { status: { equals: 'queued' } }],
      },
      limit: 1,
    });
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
