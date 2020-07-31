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
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          answers={answers}
          changeAnswer={this._changeAnswer}
        />
      );
    }

    _changeAnswer(itemPosition) {
      const {answers} = this.state;

      const answersCopy = answers.slice();
      answersCopy[itemPosition] = !answersCopy[itemPosition];

      this.setState({answers: answersCopy});
    }
  }

  WithUserAnswers.propTypes = {
    question: genreQuestion
  };

  return WithUserAnswers;
};

export default withUserAnswers;
