import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {genreQuestion} from '../../types/types';

const withUserAnswers = (Component) => {
  class WithUserAnswers extends PureComponent {
    constructor(props) {
      super(props);

      const {question: {answers}} = props;

      this.state = {
        answers: new Array(answers.length).fill(false)
      };

      this._changeAnswer = this._changeAnswer.bind(this);
      this._submitAnswers = this._submitAnswers.bind(this);
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          answers={answers}
          changeAnswer={this._changeAnswer}
          submitAnswers={this._submitAnswers}
        />
      );
    }

    _changeAnswer(itemPosition) {
      const {answers} = this.state;

      const answersCopy = answers.slice();
      answersCopy[itemPosition] = !answersCopy[itemPosition];

      this.setState({answers: answersCopy});
    }

    _submitAnswers() {
      const {answers} = this.state;
      const {question, onAnswer} = this.props;

      onAnswer(answers, question);
    }
  }

  WithUserAnswers.propTypes = {
    question: genreQuestion,
    onAnswer: PropTypes.func.isRequired
  };

  return WithUserAnswers;
};

export default withUserAnswers;
