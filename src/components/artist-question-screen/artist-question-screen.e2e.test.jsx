import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ArtistQuestionScreen} from "./artist-question-screen";

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

test(`ArtistQuestionScreen correct answer response`, () => {
  const onAnswer = jest.fn();
  const mistakesCount = 2;
  const attempts = 3;

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        question={question}
        screenIndex={3}
        onAnswer={onAnswer}
        mistakesCount={mistakesCount}
        attempts={attempts}
        renderAudioPlayer={(src, id) => <audio src={src} id={id} />}
      />);

  const correctAnswer = `Artur Latte`;

  artistQuestionScreen.find(`#answer-3`).simulate(`click`, {
    target: {
      value: correctAnswer
    }
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenCalledWith(correctAnswer, question, mistakesCount, attempts);
});
