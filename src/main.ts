#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

import {
  fetchNotification,
  fetchLatestNotificationDeriveredDate,
} from './repositories/notification';
import {
  checkServerRunning,
  fetchAudioQuery,
  fetchSoundData,
} from './repositories/sound';
import { notificationToBody } from './utils';

function playSoundData(voiceData: NodeJS.ArrayBufferView) {
  fs.writeFileSync('voice.wav', voiceData);
  execSync('play voice.wav 2> /dev/null');
}

async function main() {
  await checkServerRunning();

  let latestDeriveredDate = await fetchLatestNotificationDeriveredDate();

  setInterval(async () => {
    const notificationList = await fetchNotification(latestDeriveredDate);
    if (!notificationList.length) return;

    for (let notification of notificationList) {
      const body = notificationToBody(notification);
      if (!body) continue;

      const { data: audioQuery } = await fetchAudioQuery(body);
      const { data: soundData } = await fetchSoundData(audioQuery);

      playSoundData(soundData);
    }

    latestDeriveredDate = notificationList[notificationList.length - 1].delivered_date;
  }, 5000);
}

main();
