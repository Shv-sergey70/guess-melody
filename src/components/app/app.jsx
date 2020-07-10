import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";

class App extends PureComponent {
  static _getNextQuestionNumber(currentQuestion, totalQuestions) {
    return currentQuestion >= totalQuestions - 1 ? -1 : currentQuestion + 1;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1
    };

    this.welcomeButtonClickHandler = this.welcomeButtonClickHandler.bind(this);
    this.answerClickHandler = this.answerClickHandler.bind(this);
  }

  render() {
    const {question} = this.state;
    const {
      questions,
      time,
      attempts
    } = this.props;

    if (question === -1) {
      return (
        <WelcomeScreen time={time} attempts={attempts} onWelcomeButtonClick={this.welcomeButtonClickHandler}/>
      );
    }

    switch (questions[question].type) {
      case `genre`:
        return (
          <GenreQuestionScreen
            question={questions[question]}
            onAnswer={this.answerClickHandler}
            screenIndex={question} />
        );
      case `artist`:
        return <ArtistQuestionScreen
          question={questions[question]}
          onAnswer={this.answerClickHandler}
          screenIndex={question} />;
    }

    return null;
  }

  welcomeButtonClickHandler() {
    this.setState(({question}) => ({
      question: question + 1
    }));
  }

  answerClickHandler() {
    this.setState(({question}, {questions}) => ({
      question: App._getNextQuestionNumber(question, questions.length)
    }));
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
};


export default App;
