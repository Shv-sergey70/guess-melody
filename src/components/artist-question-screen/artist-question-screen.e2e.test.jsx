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
  const onAnswerQuestion = jest.fn();
  const renderAudioPlayerMock = jest.fn().mockImplementation((src, id) => <audio src={src} id={id}/>);
  const questionTime = 29;

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        question={question}
        screenIndex={3}
        onAnswer={onAnswer}
        renderAudioPlayer={renderAudioPlayerMock}
        questionTime={questionTime}
        onAnswerQuestion={onAnswerQuestion}
      />
  );

  const correctAnswer = `Artur Latte`;

  expect(renderAudioPlayerMock).toHaveBeenCalledTimes(1);
  expect(renderAudioPlayerMock.mock.calls[0][0]).toEqual(question.song.src);
  expect(renderAudioPlayerMock.mock.calls[0][1]).toEqual(0);

  artistQuestionScreen.find(`ArtistAnswersList`).prop(`onArtistSelect`)({
    target: {value: correctAnswer}
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswerQuestion).toHaveBeenNthCalledWith(1, correctAnswer, question, questionTime);
});
