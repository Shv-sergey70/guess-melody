import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer/game/game";
import Simple from "../simple/simple";
import Route from '../../../routes';

const WelcomeScreen = ({onClick}) => {
  return (
    <Simple
      to={Route.MAIN}
      className={`game__back`}
      onClick={onClick} >
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
    </Simple>
  );
};

WelcomeScreen.propTypes = {
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(ActionCreator.resetState())
});

export {WelcomeScreen};
export default connect(null, mapDispatchToProps)(WelcomeScreen);
