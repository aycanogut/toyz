const EVENT_TIME_ZONE = 'Europe/Istanbul';

const toDayKey = (date: Date) => date.toLocaleDateString('en-CA', { timeZone: EVENT_TIME_ZONE });

function isUpcomingEvent(date: string, now: Date = new Date()): boolean {
  return toDayKey(new Date(date)) >= toDayKey(now);
}

export default isUpcomingEvent;
