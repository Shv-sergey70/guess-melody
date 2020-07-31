import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import {getTime} from "../../reducer/game/selectors";

const LOW_TIME_LEFT_VALUE = 30;

class Timer extends PureComponent {
  static _getFormattedTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  }

  constructor(props) {
    super(props);

    const {tick, onTick} = props;

    this.timerId = setInterval(() => {
      tick();
      onTick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {time} = this.props;
    const {minutes, seconds} = Timer._getFormattedTime(time);
    const isFinishing = time <= LOW_TIME_LEFT_VALUE;

    return (
      <Fragment>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <div className={`timer__value ${isFinishing ? `timer__value--finished` : ``}`} xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">{minutes}</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">{seconds}</span>
        </div>
      </Fragment>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  tick: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  time: getTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  tick: () => dispatch(ActionCreator.decrementTime())
});

export {Timer};
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
