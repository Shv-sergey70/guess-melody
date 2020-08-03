import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreenTrack from "./genre-question-screen-track";

configure({adapter: new Adapter()});

test(`GenreQuestionScreenTrack correctly renders`, () => {
  const tree = shallow(
      <GenreQuestionScreenTrack
        trackIndex={1}
        isSelected={true}
        onChange={jest.fn()} >
        Custom children. Audio Player
      </GenreQuestionScreenTrack>
  );

  expect(tree).toMatchSnapshot();
});
