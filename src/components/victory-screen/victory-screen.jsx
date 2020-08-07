import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getMistakes, getWastedTime} from "../../reducer/game/selectors";
import PlayAgainLink from "../links/play-again/play-again";
import {getFastAnswersScores, getTotalScores} from "../../reducer/user-answers/selectors";

const getFormattedTime = (time) => ({
  minutes: Math.floor(time / 60),
  seconds: Math.floor(time % 60)
});

const getPluralForm = (number, textForms) => {
  number = Math.abs(number) % 100;
  const number1 = number % 10;

  if (number > 10 && number < 20) {
    return textForms[2];
  }
  if (number1 > 1 && number1 < 5) {
    return textForms[1];
  }
  if (number1 === 1) {
    return textForms[0];
  }

  return textForms[2];
};

const VictoryScreen = ({mistakesCount, wastedTime, totalScores, fastScores}) => {
  const {minutes, seconds} = getFormattedTime(wastedTime);
  const minutesText = getPluralForm(minutes, [`минуту`, `минуты`, `минут`]);
  const secondsText = getPluralForm(seconds, [`секунду`, `секунды`, `секунд`]);

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За {minutes} {minutesText} и {seconds} {secondsText} вы набрали {totalScores} баллов ({fastScores} быстрых), совершив {mistakesCount} ошибки</p>

      <PlayAgainLink />
    </section>
  );
};

VictoryScreen.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
  wastedTime: PropTypes.number.isRequired,
  totalScores: PropTypes.number.isRequired,
  fastScores: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  mistakesCount: getMistakes(state),
  totalScores: getTotalScores(state),
  fastScores: getFastAnswersScores(state),
  wastedTime: getWastedTime(state)
});

export {VictoryScreen};
export default connect(mapStateToProps)(VictoryScreen);
