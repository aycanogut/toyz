'use client';

import { useEffect, useState } from 'react';

import cn from '@/utils/cn';
import { HeadingItem } from '@/utils/extractHeadings';

interface AsideProps {
  headings: HeadingItem[];
  label: string;
}

function Aside({ headings, label }: AsideProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          } else if (entry.boundingClientRect.top < 0) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="sticky top-12 hidden self-start lg:block">
      <nav aria-label={label}>
        <p className="font-heading tracking-eyebrow text-paper-muted mb-3 text-base font-black uppercase">{label}</p>
        <ul>
          {headings.map(h => (
            <li
              key={h.id}
              className="mb-3"
            >
              <a
                href={`#${h.id}`}
                className={cn(
                  'font-fira border-acid block border-l-2 pl-3 text-base transition-colors',
                  activeId === h.id ? 'text-acid font-bold' : 'text-paper-muted hover:text-title-light'
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
