import { describe, expect, it } from 'vitest';

import formatSlug from '@/app/(payload)/utils/formatSlug';

interface HookArgs {
  value?: unknown;
  data?: Record<string, unknown>;
  originalDoc?: Record<string, unknown>;
  operation?: string;
  locale?: string;
}

const runHook = ({ value, data = {}, originalDoc, operation = 'create', locale = 'en' }: HookArgs) =>
  formatSlug('title')({ value, data, originalDoc, operation, req: { locale } } as never);

describe('formatSlug', () => {
  it.each([
    ['Kırmızı Işık Çağ', 'kirmizi-isik-cag'],
    ['İstanbul Gündemi: Şarkılar & Öyküler', 'istanbul-gundemi-sarkilar-oykuler'],
    ['  Punk   Is - Not  Dead!  ', 'punk-is-not-dead'],
    ['Café Society', 'cafe-society'],
  ])('generates "%s" as "%s" from the title', (title, slug) => {
    expect(runHook({ data: { title } })).toBe(slug);
  });

  it('keeps a slug typed by the editor, normalized', () => {
    expect(runHook({ value: 'Özel Slug', data: { title: 'Some Title' } })).toBe('ozel-slug');
  });

  it('does not overwrite an existing slug when the title changes', () => {
    expect(runHook({ value: 'old-slug', data: { title: 'New Title' }, operation: 'update' })).toBe('old-slug');
  });

  it('regenerates from the title when the editor clears the slug', () => {
    expect(runHook({ value: '', data: { title: 'New Title' }, operation: 'update' })).toBe('new-title');
  });

  it('generates the slug when saving in a non-English locale', () => {
    expect(runHook({ data: { title: 'Yeni Yazı' }, locale: 'tr' })).toBe('yeni-yazi');
  });

  it('falls back to the stored title when the update does not include it', () => {
    expect(runHook({ data: {}, originalDoc: { title: 'Stored Title' }, operation: 'update' })).toBe('stored-title');
  });

  it('leaves the value alone for other operations', () => {
    expect(runHook({ value: 'Keep Me', data: { title: 'Title' }, operation: 'read' })).toBe('Keep Me');
  });
});
