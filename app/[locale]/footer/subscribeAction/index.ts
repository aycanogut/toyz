'use server';

import { z } from 'zod';

import { getPayloadClient } from '@/utils/payloadClient';
import verifyReCaptcha from '@/utils/verifyReCaptcha';

interface SubscribeActionProps {
  email: string;
  preferredLocale: Locale;
  token: string;
}

const SubscribeSchema = z.object({
  email: z.email(),
  preferredLocale: z.enum(['en', 'tr']),
  token: z.string().min(1),
});

export async function subscribeAction({ email, preferredLocale, token }: SubscribeActionProps) {
  const result = SubscribeSchema.safeParse({ email, preferredLocale, token });

  if (!result.success) {
    return {
      success: false,
      message: 'invalid-email',
    };
  }

  const { isValid, score } = await verifyReCaptcha(token);

  if (!isValid || (score && score < 0.5)) {
    return {
      success: false,
      message: 'error',
    };
  }

  const payload = await getPayloadClient();

  try {
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0];

      if (subscriber.isActive) {
        return {
          success: false,
          message: 'already-subscribed',
        };
      }

      await payload.update({
        collection: 'subscribers',
        id: subscriber.id,
        data: {
          preferredLocale,
          isActive: true,
        },
      });

      return {
        success: true,
        message: 'subscribed',
      };
    }

    await payload.create({
      collection: 'subscribers',
      data: {
        email,
        preferredLocale,
        isActive: true,
      },
    });

    return {
      success: true,
      message: 'subscribed',
    };
  } catch (error) {
    console.error('Subscribe action error:', error);

    if (error instanceof Error && error.message.includes('duplicate')) {
      return {
        success: false,
        message: 'already-subscribed',
      };
    }

    return {
      success: false,
      message: 'error',
    };
  }
}
