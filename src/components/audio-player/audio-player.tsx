import * as React from "react";

type Props = {
  children: React.ReactNode,
  isLoading: boolean,
  isPlaying: boolean,
  changePlayingState: () => void
};

const AudioPlayer: React.FunctionComponent<Props> = ({children, isPlaying, isLoading, changePlayingState}) => {
  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={changePlayingState}/>
      <div className="track__status">
        {children}
      </div>
    </React.Fragment>
  );
};

export default AudioPlayer;
