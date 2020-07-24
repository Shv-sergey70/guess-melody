const initialState = {
  mistakes: 0,
  step: -1,
  time: 300
};

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  RESET: `RESET`,
  DECREMENT_TIME: `DECREMENT_TIME`
};

const isGenreAnswerCorrect = (userAnswers, {genre, answers}) => {
  return userAnswers.every((answer, i) => answer === (genre === answers[i].genre));
};

const isArtistAnswerCorrect = (userAnswer, correctAnswer) => userAnswer === correctAnswer;

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

  incrementMistakes: (userAnswer, question) => {
    let isCorrectAnswer = false;

    switch (question.type) {
      case `artist`:
        isCorrectAnswer = isArtistAnswerCorrect(userAnswer, question.song.artist);

        break;
      case `genre`:
        isCorrectAnswer = isGenreAnswerCorrect(userAnswer, question);

        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isCorrectAnswer ? 0 : 1
    };
  },

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
  }
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
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  ActionType,
  isGenreAnswerCorrect,
  isArtistAnswerCorrect
};
