import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({minutes, seconds, isFinishing}) => {
  return (
    <div className={`timer__value ${isFinishing ? `timer__value--finished` : ``}`} xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{minutes}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{seconds}</span>
    </div>
  );
};

Timer.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  isFinishing: PropTypes.bool.isRequired
};

export default Timer;
