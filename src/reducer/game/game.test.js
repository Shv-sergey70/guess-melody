import {ActionCreator, reducer, isGenreAnswerCorrect, isArtistAnswerCorrect, getAnswerType} from './game';

const initialState = {
  mistakes: 0,
  step: -1,
  time: 300,
  correctAnswersCounter: {
    usual: 0,
    fast: 0
  }
};

describe(`Reducer works correctly`, () => {
  describe(`Reducer with unknown action should return initial state`, () => {
    test(`Action type is undefined`, () => {
      expect(reducer(initialState, {
        type: undefined
      })).toEqual(initialState);
    });
  });

  describe(`Reducer with INCREMENT_STEP action correctly works`, () => {
    test(`If payload equals 1 should increment step state for 1`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_STEP`,
        payload: 1
      })).toEqual(Object.assign({}, initialState, {step: 0}));
    });

    test(`If payload equals 0 shouldn't change step state`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_STEP`,
        payload: 0
      })).toEqual(initialState);
    });
  });

  describe(`Reducer with INCREMENT_MISTAKES action correctly works`, () => {
    test(`If payload equals 1 should increment mistakes state for 1`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_MISTAKES`,
        payload: 1
      })).toEqual(Object.assign({}, initialState, {mistakes: 1}));
    });

    test(`If payload equals 0 shouldn't change mistakes state`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_MISTAKES`,
        payload: 0
      })).toEqual(initialState);
    });
  });

  describe(`Reducer with RESET action correctly works`, () => {
    test(`Should set initial state`, () => {
      expect(reducer({
        step: 200,
        mistakes: 150,
        time: 800,
        questions: [1, 4, 7]
      }, {
        type: `RESET`
      })).toEqual(initialState);
    });
  });

  describe(`Reducer with DECREMENT_TIME action correctly works`, () => {
    test(`With payload 1, should decrement time state for 1`, () => {
      expect(reducer(initialState, {
        type: `DECREMENT_TIME`,
        payload: 1
      })).toEqual(Object.assign({}, initialState, {time: 299}));
    });

    test(`With payload 0, should return initial state`, () => {
      expect(reducer(initialState, {
        type: `DECREMENT_TIME`,
        payload: 0
      })).toEqual(initialState);
    });
  });

  describe(`Reducer with REPLAY action correctly works`, () => {
    test(`Should set initial state, but step = 0`, () => {
      expect(reducer({
        step: 200,
        mistakes: 150,
        time: 800,
        questions: [1, 4, 7]
      }, {
        type: `REPLAY`
      })).toEqual(Object.assign({}, initialState, {step: 0}));
    });
  });

  describe(`Reducer with INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER action correctly works`, () => {
    test(`Should increment usual answers counter`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER`,
        payload: 1
      })).toEqual(Object.assign({}, initialState, {
        correctAnswersCounter: {
          usual: 1,
          fast: 0
        }
      }));
    });
  });

  describe(`Reducer with INCREMENT_CORRECT_FAST_ANSWERS_COUNTER action correctly works`, () => {
    test(`Should increment fast answers counter`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_CORRECT_FAST_ANSWERS_COUNTER`,
        payload: 1
      })).toEqual(Object.assign({}, initialState, {
        correctAnswersCounter: {
          usual: 0,
          fast: 1
        }
      }));
    });
  });
});

describe(`ActionCreator correctly works`, () => {
  describe(`incrementStep correctly works`, () => {
    test(`Returns correct object`, () => {
      expect(ActionCreator.incrementStep()).toEqual({
        type: `INCREMENT_STEP`,
        payload: 1
      });
    });
  });

  describe(`incrementMistakes correctly works`, () => {
    test(`incrementMistake should return INCREMENT_MISTAKE with 1 payload`, () => {
      expect(ActionCreator.incrementMistakes()).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1
      });
    });
  });

  describe(`decrementTime correctly works`, () => {
    test(`Returns correct object`, () => {
      expect(ActionCreator.decrementTime()).toEqual({
        type: `DECREMENT_TIME`,
        payload: 1
      });
    });
  });

  describe(`resetState correctly works`, () => {
    test(`Returns correct object`, () => {
      expect(ActionCreator.resetState()).toEqual({
        type: `RESET`
      });
    });
  });

  describe(`replay correctly works`, () => {
    test(`Returns correct object`, () => {
      expect(ActionCreator.replay()).toEqual({
        type: `REPLAY`
      });
    });
  });

  describe(`incrementCorrectAnswersCounter correctly works`, () => {
    test(`Usual answer type, should be returned INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER`, () => {
      expect(ActionCreator.incrementCorrectAnswersCounter(`usual`)).toEqual({
        type: `INCREMENT_CORRECT_USUAL_ANSWERS_COUNTER`,
        payload: 1
      });
    });

    test(`Fast answer type, should be returned INCREMENT_CORRECT_FAST_ANSWERS_COUNTER`, () => {
      expect(ActionCreator.incrementCorrectAnswersCounter(`fast`)).toEqual({
        type: `INCREMENT_CORRECT_FAST_ANSWERS_COUNTER`,
        payload: 1
      });
    });

    test(`Undefined answer type, should be returned Error`, () => {
      const checkFunction = () => {
        ActionCreator.incrementCorrectAnswersCounter(undefined);
      };

      expect(checkFunction)
        .toThrowError(new Error(`Unhandled answer type: undefined`));
    });
  });
});

describe(`isGenreAnswerCorrect function correctly works`, () => {
  const question = {
    genre: `rock`,
    answers: [
      {genre: `rock`},
      {genre: `jazz`},
      {genre: `rock`},
      {genre: `classic`}
    ]
  };

  test(`selected no one correct answers from 2`, () => {
    expect(isGenreAnswerCorrect([false, false, false, false], question)).toEqual(false);
  });

  test(`selected only one correct answers from 2`, () => {
    expect(isGenreAnswerCorrect([true, false, false, false], question)).toEqual(false);
  });

  test(`selected both correct answers from 2`, () => {
    expect(isGenreAnswerCorrect([true, false, true, false], question)).toEqual(true);
  });

  test(`selected both correct answers from 2 and one incorrect`, () => {
    expect(isGenreAnswerCorrect([true, false, true, true], question)).toEqual(false);
  });
});

describe(`isArtistAnswerCorrect function correctly works`, () => {
  const correctAnswer = `Artur Latte`;

  test(`selected correct answer`, () => {
    expect(isArtistAnswerCorrect(`Artur Latte`, correctAnswer)).toEqual(true);
  });

  test(`selected incorrect answer`, () => {
    expect(isArtistAnswerCorrect(`Wrong Artist`, correctAnswer)).toEqual(false);
  });
});

describe(`getAnswerType function correctly works`, () => {
  test(`time = 30 seconds, should return 'fast' type`, () => {
    expect(getAnswerType(30)).toEqual(`fast`);
  });

  test(`time = 31 seconds, should return 'fast' type`, () => {
    expect(getAnswerType(31)).toEqual(`usual`);
  });
});
