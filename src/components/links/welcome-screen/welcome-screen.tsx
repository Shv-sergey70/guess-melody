import * as React from 'react';
import {connect} from "react-redux";
import {ActionCreator as GameActionCreator} from "../../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from '../../../reducer/user-answers/user-answers';
import Simple from "../simple/simple";
import Route from '../../../routes';

type Props = {
  onClick: (evt: React.SyntheticEvent) => void
}

const WelcomeScreen: React.FunctionComponent<Props> = ({onClick}) => {
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

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(GameActionCreator.resetState());
    dispatch(UserAnswersActionCreator.resetAnswers());
  }
});

export {WelcomeScreen};
export default connect(null, mapDispatchToProps)(WelcomeScreen);
