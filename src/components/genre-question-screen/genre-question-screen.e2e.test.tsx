import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
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

test(`GenreQuestionScreen correct answer response`, () => {
  const preventDefault = jest.fn();
  const changeAnswer = jest.fn();
  const onAnswer = jest.fn();
  const resetAnswers = jest.fn();
  const onAnswerQuestion = jest.fn();
  const questionTime = 25;

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question={question}
        screenIndex={3}
        answers={[false, false, false, false]}
        changeAnswer={changeAnswer}
        questionTime={questionTime}
        resetAnswers={resetAnswers}
        onAnswer={onAnswer}
        onAnswerQuestion={onAnswerQuestion}
      />
  );

  genreQuestionScreen.find(`.game__tracks`).simulate(`submit`, {preventDefault});

  expect(resetAnswers).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswerQuestion).toHaveBeenCalledTimes(1);
  expect(onAnswerQuestion).toHaveBeenNthCalledWith(1, [false, false, false, false], question, questionTime);
  expect(preventDefault).toHaveBeenCalledTimes(1);
});
