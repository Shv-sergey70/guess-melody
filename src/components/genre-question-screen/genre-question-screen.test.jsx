import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from "./genre-question-screen";

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

test(`GenreQuestionScreen correctly renders`, () => {
  const tree = shallow(
      <GenreQuestionScreen
        question={question}
        screenIndex={3}
        onAnswer={jest.fn()} />
  );

  expect(tree).toMatchSnapshot();
});
