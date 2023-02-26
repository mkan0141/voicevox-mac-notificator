import os from 'os';
import path from 'path';
import sqlite3 from 'sqlite3';

import { NSDate, MacNotification } from '../types/index';

const dbPath = path.join(os.tmpdir(), '../0/com.apple.notificationcenter/db2/db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

function fetchNotification(latestDeriveredDate: NSDate): Promise<MacNotification[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `select * from record where delivered_date > ${latestDeriveredDate}`,
      (error, rows) => {
        if (error) reject(error);
        else resolve(rows || []);
      }
    );
  });
}

async function fetchLatestNotificationDeriveredDate(): Promise<NSDate> {
  return new Promise((resolve, reject) => {
    db.get(
      'select max(delivered_date) as delivered_date from record limit 1',
      (error, row) => {
        if (error) reject(error);
        else resolve(row.delivered_date ?? 0);
      }
    );
  });
}

export { fetchNotification, fetchLatestNotificationDeriveredDate };
