import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import {getTime} from "../../reducer/game/selectors";
import Timer from "../timer/timer";

const LOW_TIME_LEFT_VALUE = 30;

class TimerContainer extends PureComponent {
  static _getFormattedTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return {
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    };
  }

  constructor(props) {
    super(props);

    const {tick} = props;

    this.timerId = setInterval(() => {
      tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {time} = this.props;
    const {minutes, seconds} = TimerContainer._getFormattedTime(time);
    const isFinishing = time <= LOW_TIME_LEFT_VALUE;

    return (
      <Timer
        minutes={minutes}
        seconds={seconds}
        isFinishing={isFinishing}
      />
    );
  }
}

TimerContainer.propTypes = {
  time: PropTypes.number.isRequired,
  tick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  time: getTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  tick: () => dispatch(ActionCreator.decrementTime())
});

export {TimerContainer};
export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
