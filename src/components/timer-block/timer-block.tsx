import * as React from 'react';
import TimerContainer from "../timer-container/timer-container";

const TimerBlock: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370"
          style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
      </svg>

      <TimerContainer />
    </React.Fragment>
  );
};

export default TimerBlock;
