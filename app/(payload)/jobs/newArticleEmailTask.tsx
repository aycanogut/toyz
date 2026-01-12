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
    try {
      const { subscriberEmail, preferredLocale, articleId } = input;
      const locale = preferredLocale === 'tr' ? 'tr' : 'en';

      req.payload.logger.info(`📧 Processing email job for ${subscriberEmail} (locale: ${locale}, articleId: ${articleId})`);

      const article = await req.payload.findByID({
        collection: 'articles',
        id: articleId,
        locale,
      });

      if (!article || !article.slug) {
        const error = new Error(`Article not found: ${articleId} (locale: ${locale})`);
        req.payload.logger.error(`❌ ${error.message}`);
        throw error;
      }

      const articleTitle = article.title;
      const articleSummary = extractLexicalText(article.content, 2);

      let imageUrl = '';

      if (article.images) {
        try {
          const mediaId = typeof article.images === 'object' ? article.images.id : article.images;
          const media = await req.payload.findByID({
            collection: 'media',
            id: mediaId,
          });

          if (media && media.filename) {
            imageUrl = `https://cdn.toyzwebzine.com/${media.filename}`;
          }
        } catch (mediaError) {
          req.payload.logger.warn(`⚠️ Could not fetch media for article ${articleId}: ${mediaError}`);
        }
      }

      const articleUrl = `${toyzConfig.baseUrl}/${locale}/content/${article.slug}`;
      const unsubscribeUrl = `${toyzConfig.baseUrl}/api/subscribers/unsubscribe?email=${subscriberEmail}`;

      req.payload.logger.info(`📝 Rendering email template for: ${articleTitle}`);

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

      req.payload.logger.info(`✉️ Sending email to: ${subscriberEmail}`);

      await req.payload.sendEmail({
        to: subscriberEmail,
        subject: locale === 'tr' ? `Yeni İçerik: ${articleTitle}` : `New Content: ${articleTitle}`,
        html: emailHtml,
      });

      req.payload.logger.info(`✅ Email sent successfully to: ${subscriberEmail}`);

      return {
        output: {
          sent: true,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      req.payload.logger.error(`❌ Email job failed for ${input.subscriberEmail}: ${errorMessage}`);
      
      if (errorStack) {
        req.payload.logger.error(`Stack trace: ${errorStack}`);
      }

      // Re-throw the original error to preserve stack trace and error type
      throw error;
    }
  },
};
