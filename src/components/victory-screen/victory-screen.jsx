import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getMistakes, getWastedTime} from "../../reducer/game/selectors";
import PlayAgainLink from "../links/play-again/play-again";

const getFormattedTime = (time) => {
  return {
    minutes: Math.floor(time / 60),
    seconds: Math.floor(time % 60)
  };
};

const VictoryScreen = ({mistakesCount, wastedTime}) => {
  const formattedTime = getFormattedTime(wastedTime);

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За {formattedTime.minutes} минуты и {formattedTime.seconds} секунд вы набрали 12 баллов (8 быстрых), совершив {mistakesCount} ошибки</p>

      <PlayAgainLink />
    </section>
  );
};

VictoryScreen.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
  wastedTime: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  mistakesCount: getMistakes(state),
  wastedTime: getWastedTime(state)
});

export {VictoryScreen};
export default connect(mapStateToProps)(VictoryScreen);
