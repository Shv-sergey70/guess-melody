import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from "../../../reducer/game/game";
import {connect} from "react-redux";
import Simple from "../simple/simple";
import Route from '../../../routes';

const PlayAgain = ({onClick}) => {
  return (
    <Simple
      to={Route.MAIN}
      className="replay"
      onClick={onClick} >
      Сыграть ещё раз
    </Simple>
  );
};

PlayAgain.propTypes = {
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(ActionCreator.replay())
});

export {PlayAgain};
export default connect(null, mapDispatchToProps)(PlayAgain);
