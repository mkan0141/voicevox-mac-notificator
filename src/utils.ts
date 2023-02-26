import bplistParser from 'bplist-parser';

import { NSDate, Notification } from './types/index';

// https://developer.apple.com/documentation/foundation/nsdate
function dateToNSDate(date: Date): NSDate {
  return (date.valueOf() - new Date('2001-01-01T00:00:00Z').valueOf()) / 1000;
}

function notificationToBody(notification: Notification): string {
  const notificationData = bplistParser.parseBuffer(notification.data)[0];
  return notificationData?.req?.body ?? '';
}

export { dateToNSDate, notificationToBody };
