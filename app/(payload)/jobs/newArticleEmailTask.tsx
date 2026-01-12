import { render } from '@react-email/render';
import type { BasePayload, EmailField, TextField, CheckboxField } from 'payload';

import NewArticleEmail from '@/emails/NewArticleEmail';
import toyzConfig from '@/toyzConfig';

const inputSchema: (EmailField | TextField)[] = [
  { name: 'subscriberEmail', type: 'email', required: true },
  { name: 'preferredLocale', type: 'text', required: true },
  { name: 'articleTitle', type: 'text', required: true },
  { name: 'articleSlug', type: 'text', required: true },
  { name: 'articleSummary', type: 'text', required: true },
  { name: 'articleImageUrl', type: 'text', required: false },
];

const outputSchema: CheckboxField[] = [{ name: 'sent', type: 'checkbox', required: true }];

/**
 * Task configuration for sending article notification emails.
 * This task is queued when a new article is published and processes
 * email sending in the background to avoid blocking the main thread.
 */
export const newArticleEmailTask = {
  slug: 'newArticleEmail',
  retries: 3,
  inputSchema,
  outputSchema,
  handler: async ({
    input,
    req,
  }: {
    input: {
      subscriberEmail: string;
      preferredLocale: string;
      articleTitle: string;
      articleSlug: string;
      articleSummary: string;
      articleImageUrl: string;
    };
    req: { payload: BasePayload };
  }) => {
    const { subscriberEmail, preferredLocale, articleTitle, articleSlug, articleSummary, articleImageUrl } = input;

    const locale: Locale = preferredLocale === 'tr' ? 'tr' : 'en';
    const articleUrl = `${toyzConfig.baseUrl}/${locale}/content/${articleSlug}`;
    const unsubscribeUrl = `${toyzConfig.baseUrl}/api/subscribers/unsubscribe?email=${subscriberEmail}`;

    const emailHtml = await render(
      <NewArticleEmail
        title={articleTitle}
        summary={articleSummary}
        imageUrl={articleImageUrl}
        articleUrl={articleUrl}
        unsubscribeUrl={unsubscribeUrl}
        locale={locale}
      />
    );

    await req.payload.sendEmail({
      to: subscriberEmail,
      subject: locale === 'tr' ? `Yeni İçerik: ${articleTitle}` : `New Content: ${articleTitle}`,
      html: emailHtml,
    });

    return {
      output: {
        sent: true,
      },
    };
  },
};
