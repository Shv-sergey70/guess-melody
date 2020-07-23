import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GenreQuestionScreen} from "./genre-question-screen";

configure({adapter: new Adapter()});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `test/track1.mp3`,
      genre: `pop`
    },
    {
      src: `test/track2.mp3`,
      genre: `jazz`
    },
    {
      src: `test/track3.mp3`,
      genre: `rock`
    },
    {
      src: `test/track4.mp3`,
      genre: `classic`
    }
  ]
};

const getChangeEventMock = (value, checked) => ({
  target: {
    checked,
    value
  }
});

test(`GenreQuestionScreen correct answer response`, () => {
  const preventDefault = jest.fn();
  const renderAudioPlayer = jest.fn();
  const changeAnswer = jest.fn();
  const submitAnswers = jest.fn();

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        screenIndex={3}
        renderAudioPlayer={renderAudioPlayer}
        answers={[false, false, false, false]}
        changeAnswer={changeAnswer}
        submitAnswers={submitAnswers} />
  );

  genreQuestionScreen.find(`#answer-0`).simulate(`change`, getChangeEventMock(0, true));
  expect(changeAnswer).toHaveBeenNthCalledWith(1, 0);
  genreQuestionScreen.find(`#answer-2`).simulate(`change`, getChangeEventMock(2, true));
  expect(changeAnswer).toHaveBeenNthCalledWith(2, 2);
  genreQuestionScreen.find(`#answer-0`).simulate(`change`, getChangeEventMock(0, false));
  expect(changeAnswer).toHaveBeenNthCalledWith(3, 0);
  genreQuestionScreen.find(`#answer-1`).simulate(`change`, getChangeEventMock(1, true));
  expect(changeAnswer).toHaveBeenNthCalledWith(4, 1);

  genreQuestionScreen.find(`.game__tracks`).simulate(`submit`, {preventDefault});

  expect(submitAnswers).toHaveBeenCalledTimes(1);
  expect(preventDefault).toHaveBeenCalledTimes(1);
});
