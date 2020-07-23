const isGenreAnswerCorrect = (userAnswers, {genre, answers}) => {
  return userAnswers.every((answer, i) => answer === (genre === answers[i].genre));
};

const isArtistAnswerCorrect = (userAnswer, correctAnswer) => userAnswer === correctAnswer;

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
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
      type: `INCREMENT_MISTAKES`,
      payload: isCorrectAnswer ? 0 : 1
    };
  },

  decrementTime() {
    return {
      type: `DECREMENT_TIME`,
      payload: 1
    };
  },

  resetState() {
    return {
      type: `RESET`
    };
  }
};

const initialState = {
  mistakes: 0,
  step: -1,
  time: 300
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
    case `DECREMENT_TIME`:
      return Object.assign({}, state, {
        time: state.time - action.payload
      });
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  isGenreAnswerCorrect,
  isArtistAnswerCorrect
};
