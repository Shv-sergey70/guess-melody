import * as React from 'react';

type Props = {
  minutes: string,
  seconds: string,
  isFinishing: boolean
};

const Timer: React.FunctionComponent<Props> = ({minutes, seconds, isFinishing}) => {
  return (
    <div className={`timer__value ${isFinishing ? `timer__value--finished` : ``}`}>
      <span className="timer__mins">{minutes}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{seconds}</span>
    </div>
  );
};

export default Timer;
