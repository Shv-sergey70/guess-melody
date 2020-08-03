import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreenTrack = ({trackIndex, children: audioPlayer, isSelected, onChange}) => {
  const id = `answer-${trackIndex}`;

  return (
    <div className="track">
      {audioPlayer}
      <div className="game__answer">
        <input
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={trackIndex}
          id={id}
          onChange={onChange}
          checked={isSelected}/>
        <label className="game__check" htmlFor={id}>Отметить</label>
      </div>
    </div>
  );
};

GenreQuestionScreenTrack.propTypes = {
  trackIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default GenreQuestionScreenTrack;


