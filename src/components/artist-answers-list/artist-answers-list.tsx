import * as React from 'react';
import {ArtistAnswer} from "../../types";

type Props = {
  questionAnswers: ArtistAnswer[],
  onArtistSelect: (evt: React.SyntheticEvent) => void,
  screenIndex: number
};

const ArtistAnswersList: React.FunctionComponent<Props> = ({questionAnswers, onArtistSelect, screenIndex}) => {
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

export default ArtistAnswersList;
