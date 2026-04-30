'use client';

import { useTranslations } from 'next-intl';

import Icon from '@/components/Icon';
import { Link, usePathname } from '@/i18n/routing';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  currentPageTitle?: string;
}

const ROUTE_TRANSLATIONS = {
  about: 'about',
  contact: 'contact',
  search: 'search',
  events: 'events',
} as const;

type RouteKey = keyof typeof ROUTE_TRANSLATIONS;

function Breadcrumbs({ currentPageTitle }: BreadcrumbsProps) {
  const pathname = usePathname();

  const t = useTranslations('Navigation');

  const getRouteLabel = (segment: string): string => {
    if (segment in ROUTE_TRANSLATIONS) {
      return t(ROUTE_TRANSLATIONS[segment as RouteKey]);
    }
    return segment;
  };

  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const initialBreadcrumbs: BreadcrumbItem[] = [{ label: t('home'), href: '/' }];

    const { breadcrumbs } = segments.reduce(
      (acc, segment, index) => {
        const isLast = index === segments.length - 1;
        const pathSegments = [...acc.pathSegments, segment];
        const path = `/${pathSegments.join('/')}`;

        if (segment === 'content') {
          // If this is the last segment and we have a title, add it
          if (isLast && currentPageTitle) {
            return {
              breadcrumbs: [...acc.breadcrumbs, { label: currentPageTitle, href: path }],
              pathSegments,
            };
          }
          return { ...acc, pathSegments };
        }

        if (segment === 'events') {
          const items = [...acc.breadcrumbs, { label: t('events'), href: path }];

          if (isLast && currentPageTitle) {
            items.push({ label: currentPageTitle, href: path });
          }

          return { breadcrumbs: items, pathSegments };
        }

        // Only add breadcrumb for known routes or if currentPageTitle is provided
        if (segment in ROUTE_TRANSLATIONS || (isLast && currentPageTitle)) {
          const label = getRouteLabel(segment);
          const finalLabel = isLast && currentPageTitle ? currentPageTitle : label;

          return {
            breadcrumbs: [...acc.breadcrumbs, { label: finalLabel, href: path }],
            pathSegments,
          };
        }

        // Skip unknown segments
        return { ...acc, pathSegments };
      },
      { breadcrumbs: initialBreadcrumbs, pathSegments: [] as string[] }
    );

    return breadcrumbs;
  };

  if (pathname === '/') {
    return null;
  }

  const breadcrumbs = buildBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-border-dark mx-auto w-full max-w-7xl border-b p-4 md:px-8 lg:px-10 xl:px-0"
    >
      <ol className="flex min-w-0 items-center gap-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const showSeparator = index > 0;

          return (
            <li
              key={`${crumb.href}-${index}`}
              className={isLast ? 'flex min-w-0 shrink items-center gap-2' : 'flex shrink-0 items-center gap-2'}
            >
              {showSeparator && (
                <span
                  className="text-title-light"
                  aria-hidden="true"
                >
                  <Icon
                    name="arrow-right"
                    className="size-4"
                  />
                </span>
              )}

              {isLast ? (
                <span
                  className="font-heading text-title-light truncate text-base font-bold uppercase"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="font-heading tracking-eyebrow text-acid hover:text-title-light text-base font-bold uppercase transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
