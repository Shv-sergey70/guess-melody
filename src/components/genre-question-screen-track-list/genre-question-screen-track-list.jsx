import React from 'react';
import PropTypes from 'prop-types';
import {genreAnswers as genreAnswersTypes} from '../../types/types';
import GenreQuestionScreenTrack from "../genre-question-screen-track/genre-question-screen-track";

const GenreQuestionScreenTrackList = ({questionAnswers, screenIndex, activeItems, onChange, renderAudioPlayer}) => {
  return questionAnswers.map(({src}, ind) => (
    <GenreQuestionScreenTrack
      key={`${screenIndex} - ${src}`}
      isSelected={activeItems[ind]}
      onChange={onChange}
      src={src}
      trackIndex={ind} >
      {renderAudioPlayer(src, ind)}
    </GenreQuestionScreenTrack>
  ));
};

GenreQuestionScreenTrackList.propTypes = {
  questionAnswers: genreAnswersTypes,
  renderAudioPlayer: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired,
  activeItems: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
  onChange: PropTypes.func.isRequired
};

export default GenreQuestionScreenTrackList;


