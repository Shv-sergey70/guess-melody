import * as React from 'react';

type Props = {
  trackIndex: number,
  children: React.ReactNode,
  isSelected: boolean,
  onChange: () => void
};

const GenreQuestionScreenTrack: React.FunctionComponent<Props> = (props) => {
  const {trackIndex, children: audioPlayer, isSelected, onChange} = props;
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

export default GenreQuestionScreenTrack;


