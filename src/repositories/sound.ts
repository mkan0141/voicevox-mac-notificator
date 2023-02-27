import axios from 'axios';
import { AxiosResponse } from 'axios';
import { exit } from 'process';

type AudioQuery = object;

async function checkServerRunning() {
  try {
    return await axios.get('http://127.0.0.1:50021/version');
  } catch (error) {
    console.error('error', error);
    exit(-1);
  }
}

async function fetchAudioQuery(text: string): Promise<AxiosResponse<AudioQuery>> {
  if (!text) return;
  return axios.post<AudioQuery>(
    `http://127.0.0.1:50021/audio_query?text=${encodeURI(text)}&speaker=0`
  );
}

async function fetchSoundData(
  query: AudioQuery,
  charactorId: number
): Promise<AxiosResponse<NodeJS.ArrayBufferView>> {
  return axios.post<NodeJS.ArrayBufferView>(
    `http://127.0.0.1:50021/synthesis?speaker=${charactorId}&enable_interrogative_upspeak=true`,
    JSON.stringify(query),
    {
      responseType: 'arraybuffer',
      headers: {
        accept: 'audio/wav',
        'Content-Type': 'application/json',
      },
    }
  );
}

async function fetchSpeakerList() {
  return axios.get('http://127.0.0.1:50021/speakers');
}

export { checkServerRunning, fetchAudioQuery, fetchSoundData, fetchSpeakerList };
