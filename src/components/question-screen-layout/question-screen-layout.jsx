import React, {PureComponent} from 'react';
import MistakesList from "../mistakes-list/mistakes-list";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {question as questionPropTypes} from "../../types/types";
import TimerBlock from "../timer-block/timer-block";
import WelcomeScreenLink from "../links/welcome-screen/welcome-screen";

const GenreQuestionScreenWrapped = withUserAnswers(withActivePlayer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class QuestionScreenLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionTime: 0
    };

    this._increaseQuestionTime = this._increaseQuestionTime.bind(this);
  }

  render() {
    const {question} = this.props;

    const {questionTime} = this.state;

    let content = null;

    switch (question.type) {
      case `genre`:
        content = (
          <GenreQuestionScreenWrapped
            question={question}
            questionTime={questionTime}
          />
        );

        break;
      case `artist`:
        content = (
          <ArtistQuestionScreenWrapped
            question={question}
            questionTime={questionTime}
          />
        );

        break;
      default:
        throw new Error(`Unhandled question type ${question.type}`);
    }

    return (
      <section className={`game game--${question.type}`}>
        <header className="game__header">
          <WelcomeScreenLink />

          <TimerBlock/>

          <MistakesList/>
        </header>

        <section className="game__screen">
          {content}
        </section>
      </section>
    );
  }

  _increaseQuestionTime() {
    this.setState(({questionTime}) => ({questionTime: questionTime + 1}));
  }
}

QuestionScreenLayout.propTypes = {
  question: questionPropTypes
};

export default QuestionScreenLayout;
