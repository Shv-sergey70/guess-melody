import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreenTrack from "./genre-question-screen-track";

configure({adapter: new Adapter()});

test(`GenreQuestionScreenTrack's input correctly changes`, () => {
  const onChangeMock = jest.fn();

  const genreQuestionScreenTrack = shallow(
      <GenreQuestionScreenTrack
        trackIndex={1}
        isSelected={true}
        onChange={onChangeMock} >
        Custom children. Audio Player
      </GenreQuestionScreenTrack>
  );

  genreQuestionScreenTrack.find(`.game__input`).simulate(`change`);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
