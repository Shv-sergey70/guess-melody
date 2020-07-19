import {ActionCreator, reducer, isGenreAnswerCorrect, isArtistAnswerCorrect} from './reducer';

const initialState = {
  mistakes: 0,
  step: -1
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
      })).toEqual({
        mistakes: 0,
        step: 0
      });
    });

    test(`If payload equals 0 shouldn't change step state`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_STEP`,
        payload: 0
      })).toEqual({
        mistakes: 0,
        step: -1
      });
    });
  });

  describe(`Reducer with INCREMENT_MISTAKES action correctly works`, () => {
    test(`If payload equals 1 should increment mistakes state for 1`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_MISTAKES`,
        payload: 1
      })).toEqual({
        mistakes: 1,
        step: -1
      });
    });

    test(`If payload equals 0 shouldn't change mistakes state`, () => {
      expect(reducer(initialState, {
        type: `INCREMENT_MISTAKES`,
        payload: 0
      })).toEqual({
        mistakes: 0,
        step: -1
      });
    });
  });

  describe(`Reducer with RESET action correctly works`, () => {
    test(`Should set initial state`, () => {
      expect(reducer({
        step: 200,
        mistakes: 150
      }, {
        type: `RESET`
      })).toEqual(initialState);
    });
  });
});

describe(`ActionCreator correctly works`, () => {
  test(`incrementStep returns correct object`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1
    });
  });

  describe(`incrementMistakes correctly works`, () => {
    test(`Correct genre answer, incrementMistake should return INCREMENT_MISTAKE with 0 payload`, () => {
      expect(ActionCreator.incrementMistakes([false, false, true, false], {
        type: `genre`,
        genre: `rock`,
        answers: [
          {genre: `pop`},
          {genre: `jazz`},
          {genre: `rock`},
          {genre: `classic`}
        ]
      }, 0, 3)).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 0
      });
    });

    test(`Correct artist answer, incrementMistake should return INCREMENT_MISTAKE with 0 payload`, () => {
      expect(ActionCreator.incrementMistakes(`Artur Latte`, {
        type: `artist`,
        song: {
          artist: `Artur Latte`
        }
      }, 0, 3)).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 0
      });
    });

    test(`Wrong answer, incrementMistake should return INCREMENT_MISTAKE with 1 payload`, () => {
      expect(ActionCreator.incrementMistakes(`Artur`, {
        type: `artist`,
        song: {
          artist: `Artur Latte`
        }
      }, 0, 3)).toEqual({
        type: `INCREMENT_MISTAKES`,
        payload: 1
      });
    });

    test(`Wrong answer, no more attempts - incrementMistake should return RESET`, () => {
      expect(ActionCreator.incrementMistakes(`Artur`, {
        type: `artist`,
        song: {
          artist: `Artur Latte`
        }
      }, 2, 3)).toEqual({
        type: `RESET`
      });
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
