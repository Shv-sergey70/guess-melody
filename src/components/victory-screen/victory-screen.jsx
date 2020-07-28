import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getMistakes} from "../../reducer/game/selectors";

const VictoryScreen = ({mistakesCount}) => {
  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив {mistakesCount} ошибки</p>
      <button className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
};

VictoryScreen.propTypes = {
  mistakesCount: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  mistakesCount: getMistakes(state)
});

export {VictoryScreen};
export default connect(mapStateToProps)(VictoryScreen);
