import React, {PureComponent} from 'react';
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
      this._resetAnswers = this._resetAnswers.bind(this);
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          answers={answers}
          changeAnswer={this._changeAnswer}
          resetAnswers={this._resetAnswers}
        />
      );
    }

    _changeAnswer(itemPosition) {
      const {answers} = this.state;

      const answersCopy = answers.slice();
      answersCopy[itemPosition] = !answersCopy[itemPosition];

      this.setState({answers: answersCopy});
    }

    _resetAnswers() {
      const {question: {answers}} = this.props;

      this.setState({
        answers: new Array(answers.length).fill(false)
      });
    }
  }

  WithUserAnswers.propTypes = {
    question: genreQuestion
  };

  return WithUserAnswers;
};

export default withUserAnswers;
