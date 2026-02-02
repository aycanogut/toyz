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

  const { getRecapthcaToken } = useReCaptcha();

  const t = useTranslations('Navigation');
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

  return (
    <footer className="bg-background border-background-light relative min-h-100 border-t py-12 md:min-h-140 md:py-16 lg:min-h-110 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-full max-h-120 w-full max-w-100 opacity-15 md:max-h-140 md:max-w-140 lg:max-h-100 lg:max-w-100">
            <Image
              src="/toyz-big-logo.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div>
              <h3 className="text-title-light font-grotesque mb-4 text-xl font-bold tracking-wider uppercase">{t('about')}</h3>
              <p className="text-title-dark font-grotesque text-lg leading-relaxed">{tFooter('description')}</p>
            </div>

            <nav>
              <h3 className="text-title-light font-grotesque mb-4 text-xl font-bold tracking-wider uppercase">{t('pages')}</h3>
              <ul className="flex flex-col gap-3">
                {navigationItems.map(item => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className={cn(
                        'text-title-dark hover:text-title-light font-grotesque text-lg font-medium uppercase transition',
                        pathname === item.path && 'text-title-light'
                      )}
                    >
                      {t(item.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-title-light font-grotesque mb-4 text-xl font-bold tracking-wider uppercase">{t('contact')}</h3>
              <div className="flex flex-col gap-4">
                <a
                  href={toyzConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-title-dark hover:text-title-light flex items-center gap-3 transition"
                >
                  <Icon
                    name="instagram"
                    className="mt-1 size-5"
                  />
                  <span className="font-grotesque text-lg">Instagram</span>
                </a>
                <a
                  href={`mailto:${toyzConfig.contactEmail}`}
                  className="text-title-dark hover:text-title-light flex items-center gap-3 transition"
                >
                  <Icon
                    name="envelope"
                    className="mt-1 size-5"
                  />
                  <span className="font-grotesque text-lg">{toyzConfig.contactEmail}</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-title-light font-grotesque mb-4 text-xl font-bold tracking-wider uppercase">{tFooter('newsletter')}</h3>
              <p className="text-title-dark font-grotesque mb-4 text-lg leading-relaxed">{tFooter('newsletter-description')}</p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-3"
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
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="w-full cursor-pointer"
                >
                  {tFooter('newsletter-subscribe')}
                </Button>
              </form>
              <p className="text-title-dark font-grotesque mt-3 text-sm leading-relaxed opacity-60">{tFooter('recaptcha-notice')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
