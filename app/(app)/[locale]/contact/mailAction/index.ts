'use server';

import { getTranslations } from 'next-intl/server';

import toyzConfig from '@/toyzConfig';
import { getPayloadClient } from '@/utils/payloadClient';

import verifyReCaptcha from './verifyReCaptcha';

interface MailActionProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
}

export async function mailAction({ name, email, subject, message, token }: MailActionProps) {
  const t = await getTranslations('Contact');

  const { isValid, score } = await verifyReCaptcha(token);

  if (!isValid) {
    console.error('reCAPTCHA verification failed. Score:', score);
    return {
      success: false,
      message: t('error'),
    };
  }

  const payload = await getPayloadClient();

  try {
    const mail = await payload.sendEmail({
      from: `TOYZ ${t('contact-form')} <${toyzConfig.contactEmail}>`,
      to: toyzConfig.contactEmail,
      subject,
      replyTo: email,
      text: `İsim: ${name}\nEmail: ${email}\nKonu: ${subject}\n\nMesaj:\n${message}`,
      html: `
        <div>
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
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
