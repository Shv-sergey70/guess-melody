import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Operations} from "../../reducer/data/data";

const AuthorizationScreen = (props) => {
  const {email, password, onEmailChange, onPasswordChange, login, isDisabled} = props;

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total"/>
      <br/><br/>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
      <form
        className="login__form"
        action=""
        onSubmit={(evt) => {
          evt.preventDefault();

          login(email, password);
        }} >
        <p className="login__field">
          <label className="login__label" htmlFor="email">E-mail</label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onEmailChange} />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input
            className="login__input"
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange} />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit" disabled={isDisabled}>Войти</button>
      </form>
    </section>
  );
};

AuthorizationScreen.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(Operations.login(email, password))
});

export {AuthorizationScreen};
export default connect(null, mapDispatchToProps)(AuthorizationScreen);
