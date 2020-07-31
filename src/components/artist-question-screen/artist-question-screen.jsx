import React, {PureComponent, Fragment} from 'react';
import PropTypes from "prop-types";
import {ActionCreator, isArtistAnswerCorrect, getAnswerType} from "../../reducer/game/game";
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {artistQuestion} from "../../types/types";

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleOnAnswerClick = this._handleOnAnswerClick.bind(this);
  }

  render() {
    const {question: {song, answers}, screenIndex, renderAudioPlayer} = this.props;

    const content = answers.map(({picture, artist}, i) => {
      const ind = i + 1;
      const id = `answer-${ind}`;

      return (
        <div className="artist" key={`${screenIndex} - ${artist}`}>
          <input className="artist__input visually-hidden"
            type="radio" name="answer" value={artist} id={id}
            onClick={this._handleOnAnswerClick}/>
          <label className="artist__name" htmlFor={id}>
            <img className="artist__picture" src={picture} alt={artist}/>
            {artist}
          </label>
        </div>
      );
    });

    return (
      <Fragment>
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderAudioPlayer(song.src, 0)}
          </div>
        </div>

        <form className="game__artist">
          {content}
        </form>
      </Fragment>
    );
  }

  _handleOnAnswerClick(evt) {
    const {onAnswer, question, questionTime} = this.props;

    onAnswer(evt.target.value, question, questionTime);
  }
}

ArtistQuestionScreen.propTypes = {
  question: artistQuestion,
  onAnswer: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired,
  renderAudioPlayer: PropTypes.func.isRequired,
  questionTime: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  screenIndex: getStep(state)
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (answer, question, questionTime) => {
    const isCorrectAnswer = isArtistAnswerCorrect(answer, question.song.artist);

    if (isCorrectAnswer) {
      dispatch(ActionCreator.incrementCorrectAnswersCounter(getAnswerType(questionTime)));
    } else {
      dispatch(ActionCreator.incrementMistakes());
    }

    dispatch(ActionCreator.incrementStep());
  }
});

export {ArtistQuestionScreen};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistQuestionScreen);
