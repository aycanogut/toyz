import { getPayload } from 'payload';

import payloadConfig from '@/payload.config';

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (!payloadClient) {
    payloadClient = await getPayload({ config: payloadConfig });
  }

  return payloadClient;
}
