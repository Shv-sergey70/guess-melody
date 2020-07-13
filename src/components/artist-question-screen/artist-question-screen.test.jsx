import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from "./artist-question-screen";

configure({adapter: new Adapter()});

const question = {
  type: `artist`,
  song: {
    artist: `Artur Latte`,
    src: `test/track1.mp3`,
  },
  answers: [
    {
      picture: `test/track2.mp3`,
      artist: `Billie Eilish`
    },
    {
      picture: `test/track1.mp3`,
      artist: `Imagine Dragons`
    },
    {
      picture: `test/track3.mp3`,
      artist: `Artur Latte`
    }
  ]
};

test(`ArtistQuestionScreen correctly renders`, () => {
  const tree = shallow(
      <ArtistQuestionScreen
        question={question}
        screenIndex={3}
        onAnswer={jest.fn()} />
  );

  expect(tree).toMatchSnapshot();
});
