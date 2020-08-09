import * as React from 'react';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import {getTime} from "../../reducer/game/selectors";
import Timer from "../timer/timer";
import Timeout = NodeJS.Timeout;

const LOW_TIME_LEFT_VALUE = 30;

type Props = {
  time: number,
  tick: () => void
};

class TimerContainer extends React.PureComponent<Props> {
  readonly _timerId: Timeout;

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

    this._timerId = setInterval(() => {
      props.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
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

const mapStateToProps = (state) => ({
  time: getTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  tick: () => dispatch(ActionCreator.decrementTime())
});

export {TimerContainer};
export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
