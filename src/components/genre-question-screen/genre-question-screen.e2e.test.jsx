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
  const onAnswer = jest.fn();
  const preventDefault = jest.fn();
  const mistakesCount = 2;
  const attempts = 3;

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        screenIndex={3}
        onAnswer={onAnswer}
        mistakesCount={mistakesCount}
        attempts={attempts}
      />);

  genreQuestionScreen.find(`#answer-1`).simulate(`change`, getChangeEventMock(`answer-1`, true));
  genreQuestionScreen.find(`#answer-3`).simulate(`change`, getChangeEventMock(`answer-3`, true));
  genreQuestionScreen.find(`#answer-1`).simulate(`change`, getChangeEventMock(`answer-1`, false));
  genreQuestionScreen.find(`#answer-2`).simulate(`change`, getChangeEventMock(`answer-2`, true));

  genreQuestionScreen.find(`.game__tracks`).simulate(`submit`, {preventDefault});

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenCalledWith([false, true, true, false], question, mistakesCount, attempts);

  expect(preventDefault).toHaveBeenCalledTimes(1);
});
