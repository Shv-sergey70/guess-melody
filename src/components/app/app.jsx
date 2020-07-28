import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import {connect} from "react-redux";
import LosingScreen from "../losing-screen/losing-screen";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers";
import {ActionCreator} from "../../reducer/game/game";
import {getTime, getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions, getUser} from "../../reducer/data/selectors";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import withLogin from "../../hocs/with-login/with-login";
import AppRoute from '../../routes';
import VictoryScreen from "../victory-screen/victory-screen";
import withPrivateRoute from "../../hocs/with-private-route/with-private-route";

const GenreQuestionScreenWrapped = withUserAnswers(withActivePlayer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const AuthorizationScreenWrapped = withLogin(AuthorizationScreen);
const VictoryScreenWrapped = withPrivateRoute(VictoryScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._getScreen = this._getScreen.bind(this);
  }

  render() {
    const {user} = this.props;

    return (
      <Switch>
        <Route path={AppRoute.AUTH} exact component={AuthorizationScreenWrapped} />
        <Route path={AppRoute.LOSE} exact render={() => {
          return (
            <LosingScreen>
              {this._getLosingText()}
            </LosingScreen>
          );
        }}/>
        <Route path={AppRoute.VICTORY} exact render={() => {
          return (
            <VictoryScreenWrapped user={user} />
          );
        }} />
        <Route path="/" render={this._getScreen}/>
        <Route render={() => <div>404</div>}/>
      </Switch>
    );
  }

  _getScreen() {
    const {currentStep, questions, attempts, onAnswer} = this.props;

    if (currentStep === -1) {
      return (
        <WelcomeScreen attempts={attempts} />
      );
    }

    switch (questions[currentStep].type) {
      case `genre`:
        return (
          <GenreQuestionScreenWrapped
            question={questions[currentStep]}
            onAnswer={onAnswer} />
        );
      case `artist`:
        return (
          <ArtistQuestionScreenWrapped
            question={questions[currentStep]} />
        );
    }

    return null;
  }

  _getLosingText() {
    const {time, attempts, mistakesCount} = this.props;

    if (time === 0) {
      return (
        <Fragment>
          <h2 className="result__title">Увы и ах!</h2>
          <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
        </Fragment>
      );
    }

    if (mistakesCount >= attempts) {
      return (
        <Fragment>
          <h2 className="result__title">Какая жалость!</h2>
          <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий
            раз!</p>
        </Fragment>
      );
    }

    return null;
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  user: PropTypes.object // fix it
};

const mapStateToProps = (state) => ({
  currentStep: getStep(state),
  time: getTime(state),
  questions: getQuestions(state),
  mistakesCount: getMistakes(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (answer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(answer, question));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
