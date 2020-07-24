import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";

const LosingScreen = ({onReplayButtonClick, children}) => {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      {children}
      <button
        className="replay"
        type="button"
        onClick={onReplayButtonClick}>
        Попробовать ещё раз
      </button>
    </section>
  );
};

LosingScreen.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onReplayButtonClick: () => dispatch(ActionCreator.resetState())
});

export {LosingScreen};
export default connect(null, mapDispatchToProps)(LosingScreen);
