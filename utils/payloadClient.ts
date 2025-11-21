import { getPayload } from 'payload';

import type { Payload } from 'payload';

import configPromise from '@/payload.config';

interface GlobalPayload {
  client: Payload | null;
  promise: Promise<Payload> | null;
}

declare global {
  var payload: GlobalPayload;
}

let cached = global.payload;

if (!cached) {
  cached = global.payload = {
    client: null,
    promise: null,
  };
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = getPayload({
      config: configPromise,
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.client;
};
