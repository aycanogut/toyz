import { use } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Button, Icon, Input, PageHeader } from '@/components';
import { getEntriesByType } from '@/contentful/client';
import { Link, Locale } from '@/i18n';

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

        <form
          action=""
          className="flex max-w-[40rem] flex-col gap-6 lg:mt-6 lg:gap-7"
        >
          <h2 className="font-grotesque text-2xl font-medium text-title-light first-letter:capitalize lg:text-6xl">{t('message')}</h2>

          <Input aria-label={t('name')} />
          <Input aria-label={t('email')} />

          <div className="flex flex-col gap-4">
            <label
              htmlFor="subject"
              className="font-grotesque text-xl font-medium capitalize text-title-light lg:text-3.5"
            >
              {t('subject')}
            </label>
            <textarea
              id="subject"
              name="subject"
              rows={10}
              className="focus-visible:ring-primary-blue-100 w-full border bg-background-light p-4 text-sm text-title-light placeholder:text-sm placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title-light disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40"
            />
          </div>

          <Button>{t('send')}</Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
