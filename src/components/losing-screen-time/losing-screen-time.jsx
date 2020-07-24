import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";

const LosingScreenTime = ({onReplayButtonClick}) => {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">Увы и ах!</h2>
      <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
      <button
        className="replay"
        type="button"
        onClick={onReplayButtonClick}>
        Попробовать ещё раз
      </button>
    </section>
  );
};

LosingScreenTime.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onReplayButtonClick: () => dispatch(ActionCreator.resetState())
});

export {LosingScreenTime};
export default connect(null, mapDispatchToProps)(LosingScreenTime);
