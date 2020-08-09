import * as React from 'react';
import MistakesList from "../mistakes-list/mistakes-list";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {GenreQuestion, ArtistQuestion} from "../../types";
import TimerBlock from "../timer-block/timer-block";
import WelcomeScreenLink from "../links/welcome-screen/welcome-screen";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from "../../reducer/user-answers/user-answers";

const GenreQuestionScreenWrapped = withUserAnswers(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

interface Props {
  question: GenreQuestion | ArtistQuestion,
  onAnswer: () => void,
  onTimerTick: () => void
}

class QuestionScreenLayout extends React.PureComponent<Props> {
  readonly _timerId: NodeJS.Timeout;

  static _getQuestionScreen(question, onAnswer) {
    switch (question.type) {
      case `genre`:
        return (
          <GenreQuestionScreenWrapped
            question={question}
            onAnswer={onAnswer}
          />
        );
      case `artist`:
        return (
          <ArtistQuestionScreenWrapped
            question={question}
            onAnswer={onAnswer}
          />
        );
      default:
        throw new Error(`Unhandled question type ${question.type}`);
    }
  }

  constructor(props) {
    super(props);

    this._timerId = setInterval(() => {
      props.onTimerTick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
  }

  render() {
    const {question, onAnswer} = this.props;

    return (
      <section className={`game game--${question.type}`}>
        <header className="game__header">
          <WelcomeScreenLink />

          <TimerBlock/>

          <MistakesList/>
        </header>

        {QuestionScreenLayout._getQuestionScreen(question, onAnswer)}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAnswer: () => {
    dispatch(ActionCreator.incrementStep());
    dispatch(UserAnswersActionCreator.resetQuestionTime());
  },
  onTimerTick: () => {
    dispatch(UserAnswersActionCreator.incrementQuestionTime());
  }
});

export {QuestionScreenLayout};
export default connect(null, mapDispatchToProps)(QuestionScreenLayout);
