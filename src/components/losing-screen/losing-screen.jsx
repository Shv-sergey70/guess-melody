import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {isTimeOver, areAttemptsOver} from '../../reducer/game/selectors';
import PlayAgainLink from "../links/play-again/play-again";
import Route from '../../routes';

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
    default:
      content = <Redirect to={Route.MAIN}/>;
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
  isNoMoreTime: isTimeOver(state),
  isNoMoreAttempts: areAttemptsOver(state)

});

export {LosingScreen};
export default connect(mapStateToProps)(LosingScreen);
