import { fetchSpeakerList } from './../repositories/sound';

async function list() {
  const { data: speackerList } = await fetchSpeakerList();

  for (let speacker of speackerList) {
    for (let speackerStyle of speacker.styles) {
      console.log(`${speacker.name}(${speackerStyle.name}) (id: ${speackerStyle.id})`);
    }
  }

  console.log('\ncheck sample voice -> ', 'https://voicevox.hiroshiba.jp\n');
}

export { list };
