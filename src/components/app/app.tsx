import * as React from 'react';
import {GenreQuestion, ArtistQuestion, User} from '../../types';
import {Switch, Route, Redirect} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import {connect} from "react-redux";
import LosingScreen from "../losing-screen/losing-screen";
import {getStep, isTimeOver, areAttemptsOver} from '../../reducer/game/selectors';
import {getQuestions, getUser} from "../../reducer/data/selectors";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import withLogin from "../../hocs/with-login/with-login";
import AppRoute from '../../routes';
import VictoryScreen from "../victory-screen/victory-screen";
import withPrivateRoute from "../../hocs/with-private-route/with-private-route";
import QuestionScreenLayout from "../question-screen-layout/question-screen-layout";

type Question = GenreQuestion | ArtistQuestion;

interface Props {
  questions: Question[],
  attempts: number,
  currentStep: number,
  user: User | {},
  isNoMoreTime: boolean,
  isNoMoreAttempts: boolean
}

const AuthorizationScreenWrapped = withLogin(AuthorizationScreen);
const VictoryScreenWrapped = withPrivateRoute(VictoryScreen);

class App extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._getScreen = this._getScreen.bind(this);
  }

  render() {
    const {user} = this.props;

    return (
      <Switch>
        <Route path={AppRoute.AUTH} component={AuthorizationScreenWrapped} />
        <Route path={AppRoute.LOSE} component={LosingScreen} />
        <Route path={AppRoute.VICTORY} render={() => <VictoryScreenWrapped user={user} />} />
        <Route path={AppRoute.MAIN} render={this._getScreen}/>
        <Route render={() => <div>404</div>}/>
      </Switch>
    );
  }

  _getScreen() {
    const {currentStep, questions, attempts, isNoMoreTime, isNoMoreAttempts, user} = this.props;

    if (isNoMoreTime || isNoMoreAttempts) {
      return <Redirect to={AppRoute.LOSE} />;
    }

    if (currentStep === -1) {
      return <WelcomeScreen attempts={attempts} />;
    }

    if (currentStep >= questions.length) {
      return <VictoryScreenWrapped user={user} />;
    }

    return (
      <QuestionScreenLayout
        question={questions[currentStep]}/>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: getStep(state),
  questions: getQuestions(state),
  user: getUser(state),
  isNoMoreTime: isTimeOver(state),
  isNoMoreAttempts: areAttemptsOver(state)
});

export {App};
export default connect(mapStateToProps)(App);
