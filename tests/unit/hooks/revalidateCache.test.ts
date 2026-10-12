import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRevalidateTag } = vi.hoisted(() => ({
  mockRevalidateTag: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidateTag: mockRevalidateTag,
}));

import { revalidateArticleCacheOnChange, revalidateArticleCacheOnDelete } from '@/app/(payload)/hooks/revalidateArticleCache';
import { revalidateCategoriesCacheOnChange, revalidateCategoriesCacheOnDelete } from '@/app/(payload)/hooks/revalidateCategoriesCache';
import { revalidateEventsCacheOnChange, revalidateEventsCacheOnDelete, revalidateEventsGlobalCache } from '@/app/(payload)/hooks/revalidateEventsCache';
import { revalidateGlobalCache } from '@/app/(payload)/hooks/revalidateGlobalCache';

const revalidatedTags = () => mockRevalidateTag.mock.calls.map(([tag]) => tag);

const changeArgs = (status: string, previousStatus?: string) =>
  ({ doc: { _status: status }, previousDoc: previousStatus ? { _status: previousStatus } : undefined }) as never;

describe('revalidate hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe.each([
    { name: 'articles', onChange: revalidateArticleCacheOnChange, onDelete: revalidateArticleCacheOnDelete, tags: ['article', 'articles', 'sitemap'] },
    { name: 'events', onChange: revalidateEventsCacheOnChange, onDelete: revalidateEventsCacheOnDelete, tags: ['events', 'event', 'sitemap-events'] },
  ])('$name collection', ({ onChange, onDelete, tags }) => {
    it('revalidates when a document is published', () => {
      onChange(changeArgs('published', 'draft'));

      expect(revalidatedTags()).toEqual(tags);
    });

    it('revalidates when a published document is unpublished', () => {
      onChange(changeArgs('draft', 'published'));

      expect(revalidatedTags()).toEqual(tags);
    });

    it('skips draft-only saves', () => {
      onChange(changeArgs('draft', 'draft'));

      expect(mockRevalidateTag).not.toHaveBeenCalled();
    });

    it('revalidates on delete', () => {
      onDelete({} as never);

      expect(revalidatedTags()).toEqual(tags);
    });

    it('returns the saved document', () => {
      const args = changeArgs('published');

      expect(onChange(args)).toBe((args as { doc: unknown }).doc);
    });
  });

  it('revalidates categories and the article caches that embed category names', () => {
    revalidateCategoriesCacheOnChange({ doc: {} } as never);
    revalidateCategoriesCacheOnDelete({} as never);

    expect(revalidatedTags()).toEqual(['categories', 'articles', 'article', 'categories', 'articles', 'article']);
  });

  it.each(['about', 'contact', 'home', 'slider'])('revalidates the %s global tag', tag => {
    const doc = { id: 1 };

    expect(revalidateGlobalCache(tag)({ doc } as never)).toBe(doc);
    expect(mockRevalidateTag).toHaveBeenCalledWith(tag, { expire: 0 });
  });

  it('revalidates the events global tag', () => {
    revalidateEventsGlobalCache({ doc: {} } as never);

    expect(revalidatedTags()).toEqual(['events-global']);
  });
});
