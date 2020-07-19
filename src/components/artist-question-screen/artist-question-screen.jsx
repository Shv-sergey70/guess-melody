import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player";
import MistakesList from "../mistakes-list/mistakes-list";

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  render() {
    const {question: {song, answers}, onAnswer, screenIndex} = this.props;
    const {isPlaying} = this.state;

    const content = answers.map(({picture, artist}, i) => {
      const ind = i + 1;
      const id = `answer-${ind}`;

      return (
        <div className="artist" key={`${screenIndex} - ${artist}`}>
          <input className="artist__input visually-hidden"
            type="radio" name="answer" value={artist} id={id}
            onClick={(evt) => onAnswer(evt.target.value)}/>
          <label className="artist__name" htmlFor={id}>
            <img className="artist__picture" src={picture} alt={artist}/>
            {artist}
          </label>
        </div>
      );
    });

    return (
      <section className="game game--artist">
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

          <MistakesList/>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer
                src={song.src}
                isPlaying={isPlaying}
                onPlayButtonClick={this._handlePlayButtonClick}
              />
            </div>
          </div>

          <form className="game__artist">
            {content}
          </form>
        </section>
      </section>
    );
  }

  _handlePlayButtonClick() {
    this.setState(({isPlaying}) => ({
      isPlaying: !isPlaying
    }));
  }
}

const artistQuestionPropTypes = PropTypes.exact({
  type: PropTypes.oneOf([`artist`]).isRequired,
  song: PropTypes.exact({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  answers: PropTypes.arrayOf(
      PropTypes.exact({
        picture: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
}).isRequired;

ArtistQuestionScreen.propTypes = {
  question: artistQuestionPropTypes,
  onAnswer: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired
};

export default ArtistQuestionScreen;
