import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GenreQuestionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: {
        'answer-1': false,
        'answer-2': false,
        'answer-3': false,
        'answer-4': false
      }
    };

    this._itemSelectHandler = this._itemSelectHandler.bind(this);
  }

  render() {
    const {question, onAnswer, screenIndex} = this.props;

    const {answers, genre} = question;

    const {activeItems} = this.state;

    const content = answers.map(({src}, i) => {
      const ind = i + 1;
      const id = `answer-${ind}`;

      return (
        <div className="track" key={`${screenIndex} - ${src}`}>
          <button className="track__button track__button--play" type="button"/>
          <div className="track__status">
            <audio/>
          </div>
          <div className="game__answer">
            <input
              className="game__input visually-hidden"
              type="checkbox"
              name="answer"
              value={id}
              id={id}
              onChange={this._itemSelectHandler}
              checked={activeItems[id]}/>
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

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"/>
            <div className="wrong"/>
            <div className="wrong"/>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();

              onAnswer(activeItems);
            }}>
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
    const activeItems = Object.assign({}, this.state.activeItems);
    activeItems[evt.target.value] = evt.target.checked;

    this.setState({activeItems});
  }
}

const genreQuestionPropTypes = PropTypes.exact({
  type: PropTypes.oneOf([`genre`]).isRequired,
  genre: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
      PropTypes.exact({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
}).isRequired;

GenreQuestionScreen.propTypes = {
  question: genreQuestionPropTypes,
  onAnswer: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired
};

export default GenreQuestionScreen;
