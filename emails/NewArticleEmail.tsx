import * as React from 'react';

import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text, Tailwind } from '@react-email/components';

import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

type Locale = 'en' | 'tr';

interface NewArticleEmailProps {
  title: string;
  summary: string;
  imageUrl?: string;
  articleUrl: string;
  unsubscribeUrl: string;
  locale?: Locale;
}

const translations = { en, tr };

export const NewArticleEmail = ({ title, summary, imageUrl, articleUrl, unsubscribeUrl, locale = 'en' }: NewArticleEmailProps) => {
  const t = translations[locale].Email;

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: '#161617',
                'background-light': '#373737',
                'title-light': '#e1e1e1',
                'title-dark': '#858585',
                'title-darker': '#252525',
                'button-background': '#ededed',
                'border-dark': '#565656',
                'border-light': '#e5e7eb',
              },
            },
          },
        }}
      >
        <Body className="bg-background m-auto font-sans">
          <Container className="border-border-dark mx-auto my-10 max-w-3xl rounded-lg border border-solid p-5">
            <Section className="mt-8">
              <Img
                src="https://toyzwebzine.com/brand-logo.webp"
                width="120"
                height="auto"
                alt="Toyz Webzine"
                className="mx-auto my-0"
              />
            </Section>

            <Section className="my-8">
              <Heading className="text-title-light mx-0 my-8 p-0 text-2xl font-bold">{title}</Heading>
              {imageUrl && (
                <Img
                  src={imageUrl}
                  alt={title}
                  className="mb-6 w-full rounded-lg object-cover"
                />
              )}
              {summary.split('\n\n').map((paragraph, index) => (
                <Text
                  key={index}
                  className="text-title-dark mb-4 text-left text-base leading-relaxed"
                >
                  {paragraph}
                </Text>
              ))}
              <Section className="my-8 text-center">
                <Button
                  className="bg-button-background text-background rounded px-6 py-3 text-center text-xs font-bold tracking-widest uppercase no-underline"
                  href={articleUrl}
                >
                  {t['read-more']}
                </Button>
              </Section>
            </Section>

            <Hr className="border-border-dark mx-0 my-6 w-full border border-solid" />

            <Section className="text-title-dark text-center text-xs">
              <Text>{t['subscription-note']}</Text>
              <Link
                href={unsubscribeUrl}
                className="text-title-light underline"
              >
                {t.unsubscribe}
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewArticleEmail.PreviewProps = {
  title: 'ANGER BUT MAKE IT SLAY: Solidarity, Scene and Politics w/ Spiruline from Paris',
  summary: `We talked with Spiruline about the Paris scene to different cities, and about the struggle for visibility and creating safe spaces within the DIY, riot grrrl energy, and hardcore scenes.

  Our paths crossed in Paris in October. Thanks to Les Murènes—a collective that some of the band members are part of—and another amazing collective, Mala Fama, the Paris launch gig of "Antipode" took place, and it truly turned into something incredible. During the same period, I had the chance to stay in Paris for a few more days and see Spiruline on stage in a completely different venue and context. Their stage presence, power, and that amazing, finger-snap-filled energy.. It was an insanely good gig! This interview happened exactly as a continuation of the excitement from that experience.
  `,
  imageUrl: 'https://cdn.toyzwebzine.com/spiruline-1.webp',
  articleUrl: 'https://www.toyzwebzine.com/en/content/anger-but-make-it-slay-solidarity-scene-and-politics-w-spiruline-from-paris',
  unsubscribeUrl: 'https://toyzwebzine.com/api/subscribers/unsubscribe?email=test@example.com',
  locale: 'en',
};

export default NewArticleEmail;
