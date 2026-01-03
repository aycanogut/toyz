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
          return { ...acc, pathSegments };
        }

        if (segment === 'events') {
          const items = [...acc.breadcrumbs, { label: t('events'), href: path }];

          if (isLast && currentPageTitle) {
            items.push({ label: currentPageTitle, href: path });
          }

          return { breadcrumbs: items, pathSegments };
        }

        const label = getRouteLabel(segment);
        const finalLabel = isLast && currentPageTitle ? currentPageTitle : label;

        return {
          breadcrumbs: [...acc.breadcrumbs, { label: finalLabel, href: path }],
          pathSegments,
        };
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
      className="container mx-auto p-4"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const showSeparator = index > 0;

          return (
            <li
              key={`${crumb.href}-${index}`}
              className="flex items-center gap-2"
            >
              {showSeparator && (
                <Icon
                  name="arrow-right"
                  className="text-title-dark size-5 lg:mt-1"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="font-grotesque text-title-light text-sm font-medium uppercase lg:text-lg"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="font-grotesque text-title-dark hover:text-title-light text-sm font-medium uppercase transition-colors lg:text-lg"
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
