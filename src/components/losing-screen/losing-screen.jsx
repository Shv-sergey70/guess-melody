import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {checkTime, checkAttempt} from '../../reducer/game/selectors';
import PlayAgainLink from "../links/play-again/play-again";

const LosingScreen = ({isNoMoreTime, isNoMoreAttempts}) => {
  let content = null;

  switch (true) {
    case isNoMoreTime:
      content = (
        <Fragment>
          <h2 className="result__title">Увы и ах!</h2>
          <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
        </Fragment>
      );

      break;
    case isNoMoreAttempts:
      content = (
        <Fragment>
          <h2 className="result__title">Какая жалость!</h2>
          <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий
            раз!</p>
        </Fragment>
      );

      break;
  }

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>

      {content}

      <PlayAgainLink />
    </section>
  );
};

LosingScreen.propTypes = {
  isNoMoreTime: PropTypes.bool.isRequired,
  isNoMoreAttempts: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isNoMoreTime: checkTime(state),
  isNoMoreAttempts: checkAttempt(state)

});

export {LosingScreen};
export default connect(mapStateToProps)(LosingScreen);
