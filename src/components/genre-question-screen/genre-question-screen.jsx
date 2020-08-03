import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {genreQuestion} from '../../types/types';
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {ActionCreator as GameActionCreator, isGenreAnswerCorrect} from "../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from "../../reducer/user-answers/user-answers";
import GenreQuestionScreenTrackList from "../genre-question-screen-track-list/genre-question-screen-track-list";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import {getQuestionTime} from "../../reducer/user-answers/selectors";
import {getAnswerType} from "../../reducer/user-answers/user-answers";

const GenreQuestionScreenTrackListWrapped = withActivePlayer(GenreQuestionScreenTrackList);

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._itemSelectHandler = this._itemSelectHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {question, screenIndex, answers: activeItems} = this.props;

    const {answers: questionAnswers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleFormSubmit} >

          <GenreQuestionScreenTrackListWrapped
            onChange={this._itemSelectHandler}
            screenIndex={screenIndex}
            questionAnswers={questionAnswers}
            activeItems={activeItems}
          />

          <button
            className="game__submit button"
            type="submit">
            Ответить
          </button>
        </form>
      </section>
    );
  }

  _itemSelectHandler(evt) {
    const {changeAnswer} = this.props;

    changeAnswer(evt.target.value);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const {onAnswer, answers: activeItems, question, resetAnswers, questionTime, onAnswerQuestion} = this.props;

    onAnswerQuestion(activeItems, question, questionTime);
    onAnswer();
    resetAnswers();
  }
}

GenreQuestionScreen.propTypes = {
  question: genreQuestion,
  screenIndex: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  changeAnswer: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onAnswerQuestion: PropTypes.func.isRequired,
  resetAnswers: PropTypes.func.isRequired,
  questionTime: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    questionTime: getQuestionTime(state),
    screenIndex: getStep(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAnswerQuestion: (answer, question, questionTime) => {
    if (isGenreAnswerCorrect(answer, question)) {
      dispatch(UserAnswersActionCreator.incrementAnswersCounter(getAnswerType(questionTime)));
    } else {
      dispatch(GameActionCreator.incrementMistakes());
    }
  }
});

export {GenreQuestionScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GenreQuestionScreen);


