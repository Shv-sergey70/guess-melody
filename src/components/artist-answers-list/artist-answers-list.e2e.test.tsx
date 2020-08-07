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
  const onArtistSelectMock = jest.fn();

  const artistAnswersList = shallow(
      <ArtistAnswersList
        questionAnswers={questionAnswers}
        onArtistSelect={onArtistSelectMock}
        screenIndex={2}
      />
  );

  const firstEvt = {
    target: {
      value: `test-0`
    }
  };

  const secondEvt = {
    target: {
      value: `test-1`
    }
  };

  artistAnswersList.find(`.artist__input`).at(0).simulate(`click`, firstEvt);
  artistAnswersList.find(`.artist__input`).at(1).simulate(`click`, secondEvt);

  expect(onArtistSelectMock).toHaveBeenCalledTimes(2);
  expect(onArtistSelectMock).toHaveBeenNthCalledWith(1, firstEvt);
  expect(onArtistSelectMock).toHaveBeenNthCalledWith(2, secondEvt);
});
