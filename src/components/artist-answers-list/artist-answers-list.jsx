import React from 'react';
import PropTypes from "prop-types";
import {artistAnswers} from "../../types/types";

const ArtistAnswersList = ({questionAnswers, onArtistSelect, screenIndex}) => {
  const content = questionAnswers.map(({picture, artist}, ind) => {
    const id = `answer-${ind}`;

    return (
      <div className="artist" key={`${screenIndex} - ${artist}`}>
        <input className="artist__input visually-hidden"
          type="radio"
          name="answer"
          value={artist}
          id={id}
          onClick={onArtistSelect}/>
        <label className="artist__name" htmlFor={id}>
          <img className="artist__picture" src={picture} alt={artist}/>
          {artist}
        </label>
      </div>
    );
  });

  return (
    <form className="game__artist">{content}</form>
  );
};

ArtistAnswersList.propTypes = {
  questionAnswers: artistAnswers,
  onArtistSelect: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired
};

export default ArtistAnswersList;
