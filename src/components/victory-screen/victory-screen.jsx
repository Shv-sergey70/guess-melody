import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getMistakes, getWastedTime} from "../../reducer/game/selectors";
import Route from '../../routes';
import {ActionCreator} from "../../reducer/game/game";

const getFormattedTime = (time) => {
  return {
    minutes: Math.floor(time / 60),
    seconds: Math.floor(time % 60)
  };
};

const VictoryScreen = ({mistakesCount, wastedTime, onReplayButtonClick}) => {
  const formattedTime = getFormattedTime(wastedTime);

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За {formattedTime.minutes} минуты и {formattedTime.seconds} секунд вы набрали 12 баллов (8 быстрых), совершив {mistakesCount} ошибки</p>
      <Link
        to={Route.MAIN}
        className="replay"
        onClick={onReplayButtonClick} >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

VictoryScreen.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
  wastedTime: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  mistakesCount: getMistakes(state),
  wastedTime: getWastedTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  onReplayButtonClick: () => dispatch(ActionCreator.replay())
});

export {VictoryScreen};
export default connect(mapStateToProps, mapDispatchToProps)(VictoryScreen);
