import * as React from 'react';
import GenreQuestionScreenTrack from "../genre-question-screen-track/genre-question-screen-track";
import {GenreAnswer} from "../../types";

type Props = {
  questionAnswers: GenreAnswer[],
  renderAudioPlayer: (src: string, ind: number) => React.ReactNode,
  screenIndex: number,
  activeItems: boolean[],
  onChange: () => void
};

const GenreQuestionScreenTrackList: React.FunctionComponent<Props> = (props) => {
  const {questionAnswers, screenIndex, activeItems, onChange, renderAudioPlayer} = props;

  return (
    <React.Fragment>
      {questionAnswers.map(({src}, ind) => (
        <GenreQuestionScreenTrack
          key={`${screenIndex} - ${src}`}
          isSelected={activeItems[ind]}
          onChange={onChange}
          trackIndex={ind}
        >
          {renderAudioPlayer(src, ind)}
        </GenreQuestionScreenTrack>
      ))}
    </React.Fragment>
  );
};

export default GenreQuestionScreenTrackList;


