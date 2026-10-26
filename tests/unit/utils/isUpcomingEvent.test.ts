import { describe, expect, it } from 'vitest';

import isUpcomingEvent from '@/utils/isUpcomingEvent';

const now = new Date('2026-10-26T10:00:00Z');

describe('isUpcomingEvent', () => {
  it('treats an event later today as upcoming', () => {
    expect(isUpcomingEvent('2026-10-26T18:00:00Z', now)).toBe(true);
  });

  it('keeps an event upcoming for the whole Istanbul day it is on', () => {
    expect(isUpcomingEvent('2026-10-25T21:00:00Z', new Date('2026-10-26T20:59:00Z'))).toBe(true);
  });

  it('treats an event from yesterday as past', () => {
    expect(isUpcomingEvent('2026-10-24T21:00:00Z', now)).toBe(false);
  });

  it('treats future dates as upcoming', () => {
    expect(isUpcomingEvent('2026-11-03T21:00:00Z', now)).toBe(true);
  });
});
