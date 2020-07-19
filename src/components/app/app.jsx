import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import {connect} from "react-redux";

const App = ({currentStep, questions, time, attempts}) => {
  if (currentStep === -1) {
    return (
      <WelcomeScreen time={time} attempts={attempts} />
    );
  }

  switch (questions[currentStep].type) {
    case `genre`:
      return (
        <GenreQuestionScreen
          question={questions[currentStep]}
          attempts={attempts} />
      );
    case `artist`:
      return (
        <ArtistQuestionScreen
          question={questions[currentStep]}
          attempts={attempts} />
      );
  }

  return null;
};

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired
};

const mapStateToProps = ({step}) => ({
  currentStep: step
});

export {App};
export default connect(mapStateToProps)(App);
