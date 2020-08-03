import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {ActionCreator as GameActionCreator, isArtistAnswerCorrect} from "../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from "../../reducer/user-answers/user-answers";
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {artistQuestion} from "../../types/types";
import ArtistAnswersList from "../artist-answers-list/artist-answers-list";
import {getQuestionTime} from "../../reducer/user-answers/selectors";
import {getAnswerType} from "../../reducer/user-answers/user-answers";

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleOnAnswerClick = this._handleOnAnswerClick.bind(this);
  }

  render() {
    const {question: {song, answers: questionAnswers}, screenIndex, renderAudioPlayer} = this.props;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderAudioPlayer(song.src, 0)}
          </div>
        </div>

        <ArtistAnswersList
          onArtistSelect={this._handleOnAnswerClick}
          screenIndex={screenIndex}
          questionAnswers={questionAnswers}
        />
      </section>
    );
  }

  _handleOnAnswerClick(evt) {
    const {onAnswer, question, questionTime, onAnswerQuestion} = this.props;

    onAnswerQuestion(evt.target.value, question, questionTime);
    onAnswer();
  }
}

ArtistQuestionScreen.propTypes = {
  question: artistQuestion,
  onAnswer: PropTypes.func.isRequired,
  onAnswerQuestion: PropTypes.func.isRequired,
  screenIndex: PropTypes.number.isRequired,
  renderAudioPlayer: PropTypes.func.isRequired,
  questionTime: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  questionTime: getQuestionTime(state),
  screenIndex: getStep(state)
});

const mapDispatchToProps = (dispatch) => ({
  onAnswerQuestion: (answer, question, questionTime) => {
    if (isArtistAnswerCorrect(answer, question.song.artist)) {
      dispatch(UserAnswersActionCreator.incrementAnswersCounter(getAnswerType(questionTime)));
    } else {
      dispatch(GameActionCreator.incrementMistakes());
    }
  }
});

export {ArtistQuestionScreen};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistQuestionScreen);
