import React from 'react';
import PropTypes from 'prop-types';
import Timer from "../timer/timer";
import MistakesList from "../mistakes-list/mistakes-list";
import {ActionCreator} from "../../reducer/game/game";
import {connect} from "react-redux";
import withUserAnswers from "../../hocs/with-user-answers/with-user-answers";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {question as questionPropTypes} from "../../types/types";

const GenreQuestionScreenWrapped = withUserAnswers(withActivePlayer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

const QuestionScreenLayout = ({question, onAnswer}) => {
  let content = null;

  switch (question.type) {
    case `genre`:
      content = (
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={onAnswer} />
      );

      break;
    case `artist`:
      content = (
        <ArtistQuestionScreenWrapped
          question={question} />
      );

      break;
    default:
      throw new Error(`Unhandled question type ${question.type}`);
  }

  return (
    <section className={`game game--${question.type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Timer/>

        <MistakesList/>
      </header>

      <section className="game__screen">
        {content}
      </section>
    </section>
  );
};

QuestionScreenLayout.propTypes = {
  question: questionPropTypes,
  onAnswer: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (answer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(answer, question));
  }
});

export {QuestionScreenLayout};
export default connect(null, mapDispatchToProps)(QuestionScreenLayout);
