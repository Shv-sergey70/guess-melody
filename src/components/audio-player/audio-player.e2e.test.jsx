import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

describe(`AudioPlayer behaviour testing`, () => {
  test(`AudioPlayer is disabled`, () => {
    const onPlayButtonClick = jest.fn();

    const audioPlayer = mount(
        <AudioPlayer
          src="/my/custom/way/to/music.mp3"
          isPlaying={false}
          onPlayButtonClick={onPlayButtonClick} />
    );

    jest.spyOn(React, `createRef`).mockImplementation(() => ({
      current: document.createElement(`audio`)
    }));

    expect(audioPlayer.find(`.track__button`).prop(`disabled`)).toEqual(true);

    audioPlayer.find(`.track__button`).simulate(`click`);

    expect(onPlayButtonClick).toHaveBeenCalledTimes(0);

    expect(audioPlayer.state()).toEqual({
      progress: 0,
      isLoading: true,
      isPlaying: false
    });
  });


  test(`AudioPlayer's isPlaying state changes correctly`, () => {
    const onPlayButtonClick = jest.fn();
    const onPause = jest.fn();

    const audioPlayer = mount(
        <AudioPlayer
          src="/my/custom/way/to/music.mp3"
          isPlaying={false}
          onPlayButtonClick={onPlayButtonClick} />
    );

    expect(audioPlayer.state()).toEqual({
      progress: 0,
      isLoading: true,
      isPlaying: false
    });

    const mockAudio = document.createElement(`audio`);

    window.HTMLMediaElement.prototype.pause = onPause;

    jest.spyOn(React, `createRef`).mockImplementation(() => ({
      current: mockAudio
    }));

    audioPlayer.setState({isLoading: false});

    audioPlayer.find(`.track__button`).simulate(`click`);

    expect(audioPlayer.state()).toEqual({
      progress: 0,
      isLoading: false,
      isPlaying: true
    });

    audioPlayer.find(`.track__button`).simulate(`click`);

    expect(audioPlayer.state()).toEqual({
      progress: 0,
      isLoading: false,
      isPlaying: false
    });

    expect(onPlayButtonClick).toHaveBeenCalledTimes(2);
    expect(onPause).toHaveBeenCalledTimes(3);
  });
});
