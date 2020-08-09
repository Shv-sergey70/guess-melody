import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import ArtistAnswersList from "./artist-answers-list";

configure({adapter: new Adapter()});

const questionAnswers = [
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
];

test(`ArtistAnswersList correctly renders`, () => {
  const tree = shallow(
      <ArtistAnswersList
        questionAnswers={questionAnswers}
        onArtistSelect={jest.fn()}
        screenIndex={2}
      />
  );

  expect(tree).toMatchSnapshot();
});
