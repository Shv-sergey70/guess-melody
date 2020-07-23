import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import {connect} from "react-redux";
import LosingScreen from "../losing-screen/losing-screen";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers";
import {ActionCreator} from "../../reducer/reducer";

const GenreQuestionScreenWrapped = withUserAnswers(withActivePlayer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

const App = ({currentStep, questions, time, attempts, onAnswer}) => {
  if (currentStep === -1) {
    return (
      <WelcomeScreen attempts={attempts} />
    );
  }

  if (time === 0) {
    return <LosingScreen/>;
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
};

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

const mapStateToProps = ({step, time, questions}) => ({
  currentStep: step,
  time,
  questions
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (answer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(answer, question));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
