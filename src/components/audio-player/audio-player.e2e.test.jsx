import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

describe(`AudioPlayer behaviour testing`, () => {
  const pathToMusic = `my/custom/way/to/music.mp3`;

  test(`AudioPlayer is disabled`, () => {
    const onPlayButtonClick = jest.fn();

    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={false}
          isLoading={true}
          onPlayButtonClick={onPlayButtonClick}>
          <audio src={pathToMusic} />
        </AudioPlayer>
    );

    expect(audioPlayer.find(`.track__button`).prop(`disabled`)).toEqual(true);

    audioPlayer.find(`.track__button`).simulate(`click`);

    expect(onPlayButtonClick).toHaveBeenCalledTimes(0);
  });


  test(`AudioPlayer's click on loaded player works correctly`, () => {
    const onPlayButtonClick = jest.fn();

    const audioPlayer = shallow(
        <AudioPlayer
          isPlaying={false}
          isLoading={true}
          onPlayButtonClick={onPlayButtonClick}>
          <audio src={pathToMusic} />
        </AudioPlayer>
    );

    audioPlayer.find(`.track__button`).simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });
});
