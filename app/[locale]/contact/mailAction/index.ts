'use server';

import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import toyzConfig from '@/toyzConfig';
import { getPayloadClient } from '@/utils/payloadClient';

import verifyReCaptcha from './verifyReCaptcha';

const escapeHtml = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

interface MailActionProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
}

const ContactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(5000),
  token: z.string().min(1),
});

export async function mailAction({ name, email, subject, message, token }: MailActionProps) {
  const t = await getTranslations('Contact');

  const { isValid, score } = await verifyReCaptcha(token);

  const result = ContactSchema.safeParse({ name, email, subject, message, token });

  if (!result.success) {
    return { success: false, message: t('invalid-data') };
  }

  if (!isValid || (score && score < 0.5)) {
    return {
      success: false,
      message: t('error'),
    };
  }

  const payload = await getPayloadClient();

  try {
    const mail = await payload.sendEmail({
      from: `${subject} - ${name} <${email}>`,
      to: toyzConfig.contactEmail,
      subject,
      replyTo: email,
      text: `İsim: ${name}\nEmail: ${email}\nKonu: ${subject}\n\nMesaj:\n${message}`,
      html: `
        <div>
          <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Konu:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    return {
      success: true,
      data: mail,
      message: t('success'),
    };
  } catch (error) {
    console.error('Mail action error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : t('error'),
    };
  }
}
