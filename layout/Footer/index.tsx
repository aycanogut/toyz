'use client';

import { FormEvent, useState } from 'react';

import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { subscribeAction } from '@/app/[locale]/footer/subscribeAction';
import useReCaptcha from '@/app/[locale]/hooks/useReCaptcha';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { Link, usePathname } from '@/i18n/routing';
import toyzConfig from '@/toyzConfig';
import cn from '@/utils/cn';

import navigationItems from '../Header/navigationItems';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathname = usePathname();

  const locale = useLocale() as Locale;

  const { getRecapthcaToken } = useReCaptcha();

  const tNav = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  const handleNewsletterSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getRecapthcaToken();

      if (!token) {
        toast.error(tFooter('error'));
        setIsSubmitting(false);
        return;
      }

      const response = await subscribeAction({
        email: email.trim(),
        preferredLocale: locale,
        token,
      });

      if (response?.success) {
        setEmail('');
        toast.success(tFooter(response.message || 'subscribed'));
      } else {
        toast.error(tFooter(response?.message || 'error'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(tFooter('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background text-title-light border-title-light relative overflow-hidden border-t-2 px-6 pt-10 pb-6 md:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-footer lg:items-start lg:gap-8">
        <div className="lg:order-1">
          <h3 className="font-heading text-acid mb-3 text-xs font-black tracking-eyebrow uppercase">{tFooter('about')}</h3>
          <p className="font-grotesque text-title-dark max-w-xs text-sm leading-relaxed">{tFooter('description')}</p>
        </div>

        <nav className="lg:order-2">
          <h3 className="font-heading text-acid mb-3 text-xs font-black tracking-eyebrow uppercase">{tNav('pages')}</h3>
          <ul className="flex flex-col gap-2">
            {navigationItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    'font-heading text-title-light hover:text-acid text-sm font-bold tracking-label uppercase transition-colors',
                    pathname === item.path && 'text-acid'
                  )}
                >
                  {tNav(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="row-start-1 flex justify-center self-center md:col-span-2 lg:col-span-1 lg:order-3 lg:row-start-auto lg:self-center">
          <Image
            src="/toyz-big-logo.webp"
            alt="TOYZ"
            width={280}
            height={280}
            className="size-48 object-contain md:size-64"
          />
        </div>

        <div className="lg:order-4">
          <h3 className="font-heading text-acid mb-3 text-xs font-black tracking-eyebrow uppercase">{tFooter('contact')}</h3>
          <div className="flex flex-col gap-3">
            <a
              href={toyzConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesque text-title-dark hover:text-acid flex items-center gap-2 text-sm transition-colors"
            >
              <Icon
                name="instagram"
                className="text-acid text-base"
              />
              Instagram
            </a>
            <a
              href={`mailto:${toyzConfig.contactEmail}`}
              className="font-grotesque text-title-dark hover:text-acid flex items-center gap-2 text-sm transition-colors"
            >
              <Icon
                name="envelope"
                className="text-acid text-base"
              />
              {toyzConfig.contactEmail}
            </a>
          </div>
        </div>

        <div
          id="newsletter"
          className="scroll-mt-28 lg:order-5"
        >
          <h3 className="font-heading text-acid mb-3 text-xs font-black tracking-eyebrow uppercase">{tFooter('newsletter')}</h3>
          <p className="font-grotesque text-title-dark mb-3 text-sm leading-relaxed">{tFooter('newsletter-description')}</p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-2"
          >
            <Input
              type="email"
              placeholder={tFooter('newsletter-placeholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-acid text-background hover:bg-title-light font-heading border-title-light w-full border-2 px-4 py-2.5 text-xs font-black tracking-eyebrow uppercase transition-colors disabled:opacity-60"
            >
              {tFooter('newsletter-subscribe')}
            </button>
          </form>
          <p className="font-grotesque text-paper-muted mt-3 text-xs leading-relaxed opacity-70">{tFooter('recaptcha-notice')}</p>
        </div>
      </div>

      <div className="border-rule-faint mt-10 flex flex-col items-start justify-between gap-3 border-t pt-4 sm:flex-row sm:items-center">
        <span className="font-heading text-paper-muted text-xs tracking-meta uppercase">
          © {new Date().getFullYear()} TOYZ Webzine
        </span>
        <button
          type="button"
          onClick={scrollToTop}
          className="font-heading text-paper-muted hover:text-acid text-xs tracking-meta uppercase transition-colors"
        >
          ↑ {tFooter('back-to-top')}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
