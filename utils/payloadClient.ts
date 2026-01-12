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

/**
 * Returns a cached Payload CMS client instance or initializes a new one.
 * Implements the singleton pattern to ensure only one connection is active,
 * which is critical for preventing connection leaks in serverless environments.
 *
 * @returns {Promise<Payload>} A promise that resolves to the Payload CMS client.
 * @throws {Error} If the database connection fails during initialization.
 */
export async function getPayloadClient(): Promise<Payload> {
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
    console.error('🔴 Database connection error (Cold Start):', error);
    throw error;
  }

  return cached.client;
}
