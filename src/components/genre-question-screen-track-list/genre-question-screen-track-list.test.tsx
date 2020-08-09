import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreenTrackList from "./genre-question-screen-track-list";

configure({adapter: new Adapter()});

const answers = [
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
];

test(`GenreQuestionScreenTrackList correctly renders`, () => {
  const renderFunction = (src, id) => <div>{src} - {id}</div>;
  const renderAudioPlayerMock = jest.fn()
    .mockImplementationOnce(renderFunction)
    .mockImplementationOnce(renderFunction)
    .mockImplementationOnce(renderFunction)
    .mockImplementationOnce(renderFunction);

  const tree = shallow(
      <GenreQuestionScreenTrackList
        activeItems={[false, true, false, true]}
        questionAnswers={answers}
        screenIndex={3}
        renderAudioPlayer={renderAudioPlayerMock}
        onChange={jest.fn()}
      />
  );

  expect(tree).toMatchSnapshot();
});
