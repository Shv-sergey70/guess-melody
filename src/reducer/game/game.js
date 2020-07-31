import {gameTime} from '../../init-data';
import {AnswerType, TIME_FOR_FAST_QUESTION} from '../../const/const';

const initialState = {
  mistakes: 0,
  step: -1,
  time: gameTime,
  correctAnswersCounter: {
    usual: 0,
    fast: 0
  }
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER: `INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER`,
  INCREMENT_CORRECT_FAST_ANSWERS_COUNTER: `INCREMENT_CORRECT_FAST_ANSWERS_COUNTER`,
  RESET: `RESET`,
  DECREMENT_TIME: `DECREMENT_TIME`,
  REPLAY: `REPLAY`
};

const isGenreAnswerCorrect = (userAnswers, {genre, answers}) => {
  return userAnswers.every((answer, i) => answer === (genre === answers[i].genre));
};

const isArtistAnswerCorrect = (userAnswer, correctAnswer) => userAnswer === correctAnswer;

const getAnswerType = (wastedTime) => wastedTime > TIME_FOR_FAST_QUESTION ? AnswerType.USUAL : AnswerType.FAST;

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

  incrementMistakes: () => ({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1
  }),

  decrementTime() {
    return {
      type: ActionType.DECREMENT_TIME,
      payload: 1
    };
  },

  resetState() {
    return {
      type: ActionType.RESET
    };
  },

  replay() {
    return {
      type: ActionType.REPLAY
    };
  },

  incrementCorrectAnswersCounter: (answerType) => {
    switch (answerType) {
      case AnswerType.USUAL:
        return {
          type: ActionType.INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER,
          payload: 1
        };
      case AnswerType.FAST:
        return {
          type: ActionType.INCREMENT_CORRECT_FAST_ANSWERS_COUNTER,
          payload: 1
        };
    }

    throw new Error(`Unhandled answer type: ${answerType}`);
  },
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + payload
      });
    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + payload
      });
    case ActionType.RESET:
      return Object.assign({}, initialState);
    case ActionType.DECREMENT_TIME:
      return Object.assign({}, state, {
        time: state.time - payload
      });
    case ActionType.REPLAY:
      return Object.assign({}, initialState, {
        step: 0
      });
    case ActionType.INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER: {
      const correctAnswersCounter = Object.assign({}, state.correctAnswersCounter);

      correctAnswersCounter.usual += payload;

      return Object.assign({}, state, {correctAnswersCounter});
    }
    case ActionType.INCREMENT_CORRECT_FAST_ANSWERS_COUNTER: {
      const correctAnswersCounter = Object.assign({}, state.correctAnswersCounter);

      correctAnswersCounter.fast += payload;

      return Object.assign({}, state, {correctAnswersCounter});
    }
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  ActionType,
  isGenreAnswerCorrect,
  isArtistAnswerCorrect,
  getAnswerType
};
