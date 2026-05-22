'use client';

import { FormEvent, useState } from 'react';

import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { subscribeAction } from '@/app/[locale]/footer/subscribeAction';
import useReCaptcha from '@/app/[locale]/hooks/useReCaptcha';
import Button from '@/components/Button';
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

  const { getReCaptchaToken } = useReCaptcha();

  const tNav = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  const handleNewsletterSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getReCaptchaToken();

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
      <div className="lg:grid-cols-footer grid grid-cols-1 gap-10 md:grid-cols-2 lg:items-start lg:gap-8">
        <div className="lg:order-1">
          <h3 className="font-heading text-acid tracking-eyebrow mb-3 font-black uppercase">{tFooter('about')}</h3>
          <p className="font-fira text-title-dark max-w-xs leading-relaxed">{tFooter('description')}</p>
        </div>

        <nav className="lg:order-2">
          <h3 className="font-heading text-acid tracking-eyebrow mb-3 font-black uppercase">{tNav('pages')}</h3>
          <ul className="flex flex-col gap-2">
            {navigationItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    'font-heading text-title-light hover:text-acid tracking-label font-bold uppercase transition-colors',
                    pathname === item.path && 'text-acid'
                  )}
                >
                  {tNav(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="row-start-1 flex w-full justify-center self-center md:col-span-2 lg:order-3 lg:col-span-1 lg:row-start-auto lg:self-center">
          <Image
            src="/toyz-big-logo.webp"
            alt="TOYZ"
            width={280}
            height={280}
            className="size-48 object-contain md:size-72 lg:size-80"
          />
        </div>

        <div className="lg:order-4">
          <h3 className="font-heading text-acid tracking-eyebrow mb-3 font-black uppercase">{tFooter('contact')}</h3>
          <div className="flex flex-col gap-3">
            <a
              href={toyzConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-fira text-title-dark hover:text-acid flex items-center gap-2 text-sm transition-colors"
            >
              <Icon
                name="instagram"
                className="text-acid size-5"
              />
              Instagram
            </a>
            <a
              href={`mailto:${toyzConfig.contactEmail}`}
              className="font-fira text-title-dark hover:text-acid flex items-center gap-2 text-sm transition-colors"
            >
              <Icon
                name="envelope"
                className="text-acid size-5"
              />
              {toyzConfig.contactEmail}
            </a>
          </div>
        </div>

        <div
          id="newsletter"
          className="scroll-mt-28 lg:order-5"
        >
          <h3 className="font-heading text-acid tracking-eyebrow mb-3 font-black uppercase">{tFooter('newsletter')}</h3>
          <p className="font-fira text-title-dark mb-3 text-sm leading-relaxed">{tFooter('newsletter-description')}</p>
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
            <Button
              type="submit"
              variant="acid"
              size="fullWidth"
              disabled={isSubmitting}
              className="py-2.5 font-black disabled:opacity-60"
            >
              {tFooter('newsletter-subscribe')}
            </Button>
          </form>
          <p className="font-fira text-paper-muted mt-3 text-xs leading-relaxed opacity-70">{tFooter('recaptcha-notice')}</p>
        </div>
      </div>

      <div className="border-rule-faint mt-10 flex items-start justify-between gap-3 border-t pt-4">
        <span className="font-heading text-paper-muted tracking-meta text-sm uppercase">© {new Date().getFullYear()} TOYZ Webzine</span>
        <Button
          type="button"
          variant="ghost"
          onClick={scrollToTop}
          appendIconProps={{
            name: 'arrow-up',
            className: 'size-4',
          }}
          className="font-heading text-paper-muted hover:text-acid tracking-meta gap-1 p-0 text-xs"
        >
          {tFooter('back-to-top')}
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
