import React from 'react';

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Breadcrumbs from '@/app/[locale]/components/Breadcrumbs';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      contact: 'İletişim',
      search: 'Ara',
      events: 'Etkinlikler',
    };
    return translations[key] || key;
  },
}));

const mockPathname = '/';
const mockUsePathname = vi.fn(() => mockPathname);

vi.mock('@/i18n/routing', () => ({
  usePathname: () => mockUsePathname(),
  Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a
      href={href}
      className={className}
      data-testid={`link-${href}`}
    >
      {children}
    </a>
  ),
}));

vi.mock('@/components/Icon', () => ({
  default: ({ name, className }: { name: string; className?: string }) => (
    <span
      data-testid={`icon-${name}`}
      className={className}
    >
      {name}
    </span>
  ),
}));

describe('Breadcrumbs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render on home page', () => {
    mockUsePathname.mockReturnValue('/');

    const { container } = render(<Breadcrumbs />);

    expect(container.firstChild).toBeNull();
  });

  it('should render breadcrumbs for about page', () => {
    mockUsePathname.mockReturnValue('/about');

    render(<Breadcrumbs />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Hakkımızda')).toBeInTheDocument();
    expect(screen.getByTestId('link-/')).toBeInTheDocument();
  });

  it('should render breadcrumbs for contact page', () => {
    mockUsePathname.mockReturnValue('/contact');

    render(<Breadcrumbs />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('İletişim')).toBeInTheDocument();
  });

  it('should render breadcrumbs for search page', () => {
    mockUsePathname.mockReturnValue('/search');

    render(<Breadcrumbs />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Ara')).toBeInTheDocument();
  });

  it('should render breadcrumbs for events page', () => {
    mockUsePathname.mockReturnValue('/events');

    render(<Breadcrumbs />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    const eventsLabel = screen.getByText('Etkinlikler');
    expect(eventsLabel).toBeInTheDocument();
    // Events is the last item, so it should be a span, not a link
    expect(eventsLabel.tagName).toBe('SPAN');
    expect(eventsLabel).toHaveAttribute('aria-current', 'page');
  });

  it('should render breadcrumbs for event detail page with title', () => {
    mockUsePathname.mockReturnValue('/events/event-slug');

    render(<Breadcrumbs currentPageTitle="Etkinlik Başlığı" />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Etkinlikler')).toBeInTheDocument();
    expect(screen.getByText('Etkinlik Başlığı')).toBeInTheDocument();
    expect(screen.getByTestId('link-/events')).toBeInTheDocument();
  });

  it('should skip content segment and show only title', () => {
    mockUsePathname.mockReturnValue('/content/article-slug');

    render(<Breadcrumbs currentPageTitle="Makale Başlığı" />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Makale Başlığı')).toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('should render separator icons between items', () => {
    mockUsePathname.mockReturnValue('/events/event-slug');

    render(<Breadcrumbs currentPageTitle="Etkinlik Başlığı" />);

    const separators = screen.getAllByTestId('icon-arrow-right');
    expect(separators.length).toBe(2); // Ana Sayfa -> Events -> Etkinlik Başlığı
  });

  it('should not render separator before first item', () => {
    mockUsePathname.mockReturnValue('/about');

    render(<Breadcrumbs />);

    const listItems = screen.getAllByRole('listitem');
    const firstItem = listItems[0];
    expect(firstItem.querySelector('[data-testid="icon-arrow-right"]')).not.toBeInTheDocument();
  });

  it('should render last item as span (not clickable)', () => {
    mockUsePathname.mockReturnValue('/about');

    render(<Breadcrumbs />);

    const lastItem = screen.getByText('Hakkımızda');
    expect(lastItem.tagName).toBe('SPAN');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  it('should render non-last items as links', () => {
    mockUsePathname.mockReturnValue('/events/event-slug');

    render(<Breadcrumbs currentPageTitle="Etkinlik Başlığı" />);

    expect(screen.getByTestId('link-/')).toBeInTheDocument();
    expect(screen.getByTestId('link-/events')).toBeInTheDocument();
  });

  it('should not render when breadcrumbs length is 1 or less', () => {
    mockUsePathname.mockReturnValue('/unknown-segment');

    render(<Breadcrumbs />);

    const breadcrumbs = screen.queryByRole('navigation', { name: 'Breadcrumb' });

    expect(breadcrumbs).not.toBeInTheDocument();
  });

  it('should handle locale prefix in pathname', () => {
    mockUsePathname.mockReturnValue('/tr/about');

    render(<Breadcrumbs />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Hakkımızda')).toBeInTheDocument();
  });

  it('should use currentPageTitle when provided for non-events routes', () => {
    mockUsePathname.mockReturnValue('/about');

    render(<Breadcrumbs currentPageTitle="Özel Başlık" />);

    expect(screen.getByText('Özel Başlık')).toBeInTheDocument();
    expect(screen.queryByText('Hakkımızda')).not.toBeInTheDocument();
  });
});
