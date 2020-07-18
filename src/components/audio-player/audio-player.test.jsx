import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

test(`AudioPlayer correctly renders`, () => {
  const tree = mount(
      <AudioPlayer
        src="/my/custom/way/to/music.mp3"
        isPlaying={false}
        onPlayButtonClick={jest.fn()} />
  );

  expect(tree).toMatchSnapshot();
});
