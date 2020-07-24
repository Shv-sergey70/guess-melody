import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from "../../reducer/game/game";
import {connect} from "react-redux";
import {getTime} from "../../reducer/game/selectors";

const WelcomeScreen = (props) => {
  const {
    time,
    attempts,
    onWelcomeButtonClick
  } = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button className="welcome__button" onClick={onWelcomeButtonClick}><span className="visually-hidden">Начать игру</span></button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>За {Math.floor(time / 60)} минут нужно ответить на все вопросы.</li>
        <li>Можно допустить {attempts} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

WelcomeScreen.propTypes = {
  time: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  time: getTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick: () => dispatch(ActionCreator.incrementStep())
});

export {WelcomeScreen};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
