import * as React from 'react';
import {connect} from "react-redux";
import {Operations} from "../../reducer/data/data";

type Props = {
  email: string
  password: string
  onEmailChange: (evt: React.SyntheticEvent) => void
  onPasswordChange: (evt: React.SyntheticEvent) => void
  login: (email: string, password: string) => void
  isDisabled: boolean
};

const AuthorizationScreen: React.FunctionComponent<Props> = (props) => {
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

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(Operations.login(email, password))
});

export {AuthorizationScreen};
export default connect(null, mapDispatchToProps)(AuthorizationScreen);
