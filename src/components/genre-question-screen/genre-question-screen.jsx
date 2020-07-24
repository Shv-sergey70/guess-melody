import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {genreQuestion} from '../../types/types';

import MistakesList from "../mistakes-list/mistakes-list";
import {connect} from "react-redux";
import Timer from "../timer/timer";
import {getStep} from "../../reducer/game/selectors";

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
      <section className="game game--genre">
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
        </section>
      </section>
    );
  }

  _itemSelectHandler(evt) {
    const {changeAnswer} = this.props;

    changeAnswer(evt.target.value);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const {submitAnswers} = this.props;

    submitAnswers();
  }
}

GenreQuestionScreen.propTypes = {
  question: genreQuestion,
  screenIndex: PropTypes.number.isRequired,
  renderAudioPlayer: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  changeAnswer: PropTypes.func.isRequired,
  submitAnswers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  screenIndex: getStep(state)
});

export {GenreQuestionScreen};
export default connect(mapStateToProps)(GenreQuestionScreen);


