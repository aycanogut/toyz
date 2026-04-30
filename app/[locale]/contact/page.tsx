import { getLocale } from 'next-intl/server';

import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import getContact from '@/services/contact';
import toyzConfig from '@/toyzConfig';

import Breadcrumbs from '../components/Breadcrumbs';

import ContactForm from './ContactForm';

async function Contact() {
  const locale = await getLocale();

  const contact = await getContact(locale);

  return (
    <section>
      <Breadcrumbs />

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:pt-14 lg:pb-76 xl:px-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <header>
              <h1 className="font-heading text-title-light text-6xl leading-none font-black tracking-tight uppercase md:text-6xl lg:text-8xl">
                {contact.title}
              </h1>
            </header>

            <p className="font-fira text-title-dark text-base leading-relaxed lg:text-lg">{contact.description}</p>

            <div className="flex flex-col gap-3">
              <Link
                href={toyzConfig.instagramUrl}
                target="_blank"
                className="bg-background-light border-border-dark flex items-center gap-4 border-2 p-4"
              >
                <Icon
                  name="instagram"
                  className="text-acid size-6 shrink-0"
                />
                <div>
                  <span className="font-heading text-paper-muted tracking-eyebrow block text-base uppercase">INSTAGRAM</span>
                  <span className="font-heading text-title-light text-base font-bold lg:text-lg">toyzwebzine</span>
                </div>
              </Link>

              <Link
                href={`mailto:${toyzConfig.contactEmail}`}
                target="_blank"
                className="bg-background-light border-border-dark flex items-center gap-4 border-2 p-4"
              >
                <Icon
                  name="envelope"
                  className="text-acid size-6 shrink-0"
                />
                <div>
                  <span className="font-heading text-paper-muted tracking-eyebrow block text-base uppercase">EMAIL</span>
                  <span className="font-heading text-title-light text-base font-bold lg:text-lg">{toyzConfig.contactEmail}</span>
                </div>
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
