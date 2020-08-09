import * as React from 'react';
import {ActionCreator as GameActionCreator, isArtistAnswerCorrect} from "../../reducer/game/game";
import {ActionCreator as UserAnswersActionCreator} from "../../reducer/user-answers/user-answers";
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {ArtistQuestion} from "../../types";
import ArtistAnswersList from "../artist-answers-list/artist-answers-list";
import {getQuestionTime} from "../../reducer/user-answers/selectors";
import {getAnswerType} from "../../reducer/user-answers/user-answers";

type Props = {
  question: ArtistQuestion,
  onAnswer: () => void,
  onAnswerQuestion: (value: string, question: ArtistQuestion, questionTime: number) => void,
  screenIndex: number,
  renderAudioPlayer: (src: string, index: number) => React.ReactNode,
  questionTime: number
};

class ArtistQuestionScreen extends React.PureComponent<Props> {
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
