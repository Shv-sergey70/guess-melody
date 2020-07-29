import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import {connect} from "react-redux";
import LosingScreen from "../losing-screen/losing-screen";
import {getStep, checkTime, checkAttempt} from '../../reducer/game/selectors';
import {getQuestions, getUser} from "../../reducer/data/selectors";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import withLogin from "../../hocs/with-login/with-login";
import AppRoute from '../../routes';
import VictoryScreen from "../victory-screen/victory-screen";
import withPrivateRoute from "../../hocs/with-private-route/with-private-route";
import QuestionScreenLayout from "../question-screen-layout/question-screen-layout";

const AuthorizationScreenWrapped = withLogin(AuthorizationScreen);
const VictoryScreenWrapped = withPrivateRoute(VictoryScreen);

class App extends PureComponent {
  constructor() {
    super();

    this._getScreen = this._getScreen.bind(this);
  }

  render() {
    const {user} = this.props;

    return (
      <Switch>
        <Route path={AppRoute.AUTH} exact component={AuthorizationScreenWrapped} />
        <Route path={AppRoute.LOSE} exact component={LosingScreen} />
        <Route path={AppRoute.VICTORY} exact render={() => {
          return (
            <VictoryScreenWrapped user={user} />
          );
        }} />
        <Route path={AppRoute.MAIN} render={this._getScreen}/>
        <Route render={() => <div>404</div>}/>
      </Switch>
    );
  }

  _getScreen() {
    const {currentStep, questions, attempts, isNoMoreTime, isNoMoreAttempts} = this.props;

    if (isNoMoreTime || isNoMoreAttempts) {
      return <Redirect to={AppRoute.LOSE}/>;
    }

    if (currentStep === -1) {
      return (
        <WelcomeScreen attempts={attempts} />
      );
    }

    return (
      <QuestionScreenLayout
        question={questions[currentStep]}/>
    );
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object), // fix it
  attempts: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  user: PropTypes.object, // fix it
  isNoMoreTime: PropTypes.bool.isRequired,
  isNoMoreAttempts: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  currentStep: getStep(state),
  questions: getQuestions(state),
  user: getUser(state),
  isNoMoreTime: checkTime(state),
  isNoMoreAttempts: checkAttempt(state)
});

export {App};
export default connect(mapStateToProps)(App);
