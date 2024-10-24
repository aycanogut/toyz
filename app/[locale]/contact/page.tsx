import { use } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Icon, PageHeader } from '@/components';
import { getEntriesByType } from '@/contentful/client';
import { Link, Locale } from '@/i18n';

import ContactForm from './ContactForm';

async function getData(locale: Locale, query: string): Promise<ContactProps> {
  const response = await getEntriesByType('contact', locale, query);

  return response[0] as unknown as ContactProps;
}

function Contact() {
  const locale = useLocale();

  const data = use(getData(locale as Locale, ''));

  const t = useTranslations('Contact');

  return (
    <section>
      <PageHeader
        image={{
          src: `https:${data.fields.image.fields.file.url}`,
          alt: data.fields.image.fields.title,
        }}
        title={t('title')}
      />

      <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pb-40 lg:pt-12">
        <header>
          <h1 className="font-grotesque text-2xl font-medium uppercase text-title-light lg:hidden">{t('title')}</h1>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="flex gap-2 rounded-e rounded-s bg-background-light p-2.5 md:inline-flex"
          >
            <Icon
              name="instagram"
              size={24}
              className="size-6 text-white lg:size-9"
            />

            <span className="font-grotesque text-base font-medium text-white lg:text-2xl">toyzzapp</span>
          </Link>

          <Link
            href="mailto:toyzcontent@gmail.com"
            target="_blank"
            className="flex gap-2 rounded-e rounded-s bg-background-light p-2.5 md:inline-flex"
          >
            <Icon
              name="envelope"
              size={24}
              className="size-6 text-white lg:size-9"
            />

            <span className="font-grotesque text-base font-medium text-white lg:text-2xl">toyzcontent@gmail.com</span>
          </Link>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default Contact;
