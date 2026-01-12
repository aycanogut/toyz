import { render } from '@react-email/render';
import type { BasePayload, EmailField, TextField, CheckboxField } from 'payload';

import NewArticleEmail from '@/emails/NewArticleEmail';
import toyzConfig from '@/toyzConfig';
import extractLexicalText from '@/utils/extractLexicalText';

const inputSchema: (EmailField | TextField)[] = [
  { name: 'subscriberEmail', type: 'email', required: true },
  { name: 'preferredLocale', type: 'text', required: true },
  { name: 'articleId', type: 'text', required: true },
];

const outputSchema: CheckboxField[] = [{ name: 'sent', type: 'checkbox', required: true }];

/**
 * Task configuration for sending article notification emails.
 * This task is queued when a new article is published and processes
 * email sending in the background to avoid blocking the main thread.
 * The article is fetched with the subscriber's preferred locale for proper localization.
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
      articleId: string;
    };
    req: { payload: BasePayload };
  }) => {
    const { subscriberEmail, preferredLocale, articleId } = input;
    const locale: Locale = preferredLocale === 'tr' ? 'tr' : 'en';

    const article = await req.payload.findByID({
      collection: 'articles',
      id: articleId,
      locale,
    });

    if (!article || !article.slug) {
      throw new Error(`Article not found: ${articleId}`);
    }

    const articleTitle = article.title;
    const articleSummary = extractLexicalText(article.content, 2);

    let imageUrl = '';
    
    if (article.images) {
      const mediaId = typeof article.images === 'object' ? article.images.id : article.images;
      const media = await req.payload.findByID({
        collection: 'media',
        id: mediaId,
      });

      if (media && media.filename) {
        imageUrl = `https://cdn.toyzwebzine.com/${media.filename}`;
      }
    }

    const articleUrl = `${toyzConfig.baseUrl}/${locale}/content/${article.slug}`;
    const unsubscribeUrl = `${toyzConfig.baseUrl}/api/subscribers/unsubscribe?email=${subscriberEmail}`;

    const emailHtml = await render(
      <NewArticleEmail
        title={articleTitle}
        summary={articleSummary}
        imageUrl={imageUrl}
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
