import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {genreQuestion} from '../../types/types';
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {ActionCreator, isGenreAnswerCorrect, getAnswerType} from "../../reducer/game/game";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._itemSelectHandler = this._itemSelectHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {question, screenIndex, renderAudioPlayer, answers: activeItems} = this.props;

    const {answers, genre} = question;

    const content = answers.map(({src}, ind) => {
      const id = `answer-${ind}`;

      return (
        <div className="track" key={`${screenIndex} - ${src}`}>
          {renderAudioPlayer(src, ind)}
          <div className="game__answer">
            <input
              className="game__input visually-hidden"
              type="checkbox"
              name="answer"
              value={ind}
              id={id}
              onChange={this._itemSelectHandler}
              checked={activeItems[ind]}/>
            <label className="game__check" htmlFor={id}>Отметить</label>
          </div>
        </div>
      );
    });

    return (
      <Fragment>
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleFormSubmit}>
          {content}

          <button
            className="game__submit button"
            type="submit">
            Ответить
          </button>
        </form>
      </Fragment>
    );
  }

  _itemSelectHandler(evt) {
    const {changeAnswer} = this.props;

    changeAnswer(evt.target.value);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const {onAnswer, answers: activeItems, question, questionTime} = this.props;

    onAnswer(activeItems, question, questionTime);
  }
}

GenreQuestionScreen.propTypes = {
  question: genreQuestion,
  screenIndex: PropTypes.number.isRequired,
  renderAudioPlayer: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  changeAnswer: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  questionTime: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  screenIndex: getStep(state)
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (answer, question, questionTime) => {
    const isCorrectAnswer = isGenreAnswerCorrect(answer, question);

    if (isCorrectAnswer) {
      dispatch(ActionCreator.incrementCorrectAnswersCounter(getAnswerType(questionTime)));
    } else {
      dispatch(ActionCreator.incrementMistakes());
    }

    dispatch(ActionCreator.incrementStep());
  }
});

export {GenreQuestionScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GenreQuestionScreen);


