export type NSDate = number;

export interface Notification {
  rec_id: number;
  app_id: number;
  uuid: Buffer;
  data: Buffer;
  request_date: NSDate | null;
  request_last_date: NSDate | null;
  delivered_date: NSDate;
  presented: number;
  style: number;
  snooze_fire_date: NSDate | null;
}
