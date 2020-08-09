import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

describe(`AudioPlayer correctly renders`, () => {
  const pathToMusic = `my/custom/way/to/music.mp3`;

  test(`Play button is disabled and has play class`, () => {
    const tree = mount(
        <AudioPlayer
          isPlaying={false}
          isLoading={true}
          changePlayingState={jest.fn()}>
          <audio src={pathToMusic}/>
        </AudioPlayer>
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Play button is enabled and has pause class`, () => {
    const tree = mount(
        <AudioPlayer
          isPlaying={true}
          isLoading={false}
          changePlayingState={jest.fn()}>
          <audio src={pathToMusic}/>
        </AudioPlayer>
    );

    expect(tree).toMatchSnapshot();
  });
});
