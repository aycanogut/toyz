import { getLocale } from 'next-intl/server';

import Icon from '@/components/Icon';
import PageHeader from '@/components/PageHeader';
import { Link } from '@/i18n/routing';
import { Media } from '@/payload-types';
import { getPayloadClient } from '@/utils/payloadClient';

import ContactForm from './ContactForm';

async function Contact() {
  const locale = await getLocale();

  const payload = await getPayloadClient();

  const contact = await payload.findGlobal({
    slug: 'contact',
    locale: locale as Locale,
  });

  const media = contact.image as Media;

  if (!media) return null;

  return (
    <section>
      <PageHeader
        image={{
          src: media.url ?? '',
          alt: media.alt ?? '',
        }}
        title={contact.title}
      />

      <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pt-12 lg:pb-40">
        <header>
          <h1 className="font-grotesque text-title-light text-2xl font-medium uppercase lg:hidden">{contact.title}</h1>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="bg-background-light flex gap-2 rounded-s rounded-e p-2.5 md:inline-flex"
          >
            <Icon
              name="instagram"
              className="size-6 text-white lg:size-9"
            />

            <span className="font-grotesque text-base font-medium text-white lg:text-2xl">toyzzapp</span>
          </Link>

          <Link
            href="mailto:toyzcontent@gmail.com"
            target="_blank"
            className="bg-background-light flex gap-2 rounded-s rounded-e p-2.5 md:inline-flex"
          >
            <Icon
              name="envelope"
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
