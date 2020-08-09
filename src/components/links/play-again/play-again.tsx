import * as React from 'react';
import {ActionCreator as GameActionCreator} from "../../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from '../../../reducer/user-answers/user-answers';
import {connect} from "react-redux";
import Simple from "../simple/simple";
import Route from '../../../routes';

type Props = {
  onClick: ({}) => void
};

const PlayAgain: React.FunctionComponent<Props> = ({onClick}) => {
  return (
    <Simple
      to={Route.MAIN}
      className="replay"
      onClick={onClick} >
      Сыграть ещё раз
    </Simple>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(GameActionCreator.replay());
    dispatch(UserAnswersActionCreator.resetAnswers());
  }
});

export {PlayAgain};
export default connect(null, mapDispatchToProps)(PlayAgain);
