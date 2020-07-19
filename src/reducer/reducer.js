const isGenreAnswerCorrect = (userAnswers, {genre, answers}) => {
  return userAnswers.every((answer, i) => answer === (genre === answers[i].genre));
};

const isArtistAnswerCorrect = (userAnswer, correctAnswer) => userAnswer === correctAnswer;

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1
  })
};

const initialState = {
  mistakes: 0,
  step: -1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload
      });
    case `INCREMENT_MISTAKE`:
      return Object.assign({}, state, {
        step: state.mistakes + action.payload
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
