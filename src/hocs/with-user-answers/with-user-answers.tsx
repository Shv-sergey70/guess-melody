import * as React from 'react';
import {GenreQuestion} from '../../types';
import {Subtract} from "utility-types";

interface State {
  answers: boolean[]
}

interface InjectedProps {
  question: GenreQuestion
}

const withUserAnswers = (Component) => {
  type Props = React.ComponentProps<typeof Component>
  type ActualProps = Subtract<Props, InjectedProps>

  class WithUserAnswers extends React.PureComponent<ActualProps, State> {
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

  return WithUserAnswers;
};

export default withUserAnswers;
