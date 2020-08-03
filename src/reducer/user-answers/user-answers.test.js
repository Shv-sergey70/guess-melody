import {ActionCreator, reducer, getAnswerType} from './user-answers';

const initialState = {
  usual: 0,
  fast: 0,
  questionTime: 0
};

const ActionType = {
  INCREMENT_USUAL_ANSWERS: `INCREMENT_USUAL_ANSWERS`,
  INCREMENT_FAST_ANSWERS: `INCREMENT_FAST_ANSWERS`,
  INCREMENT_QUESTION_TIME: `INCREMENT_QUESTION_TIME`,
  RESET_QUESTION_TIME: `RESET_QUESTION_TIME`,
  RESET_ANSWERS: `RESET_ANSWERS`
};

describe(`Reducer correctly works`, () => {
  test(`${ActionType.INCREMENT_QUESTION_TIME} action should increment questionTime for 1`, () => {
    const customState = {
      usual: 5,
      fast: 10,
      questionTime: 27
    };

    expect(reducer(customState, {
      type: ActionType.INCREMENT_QUESTION_TIME,
      payload: 1
    })).toEqual(Object.assign({}, customState, {
      questionTime: 28,
    }));
  });

  test(`${ActionType.INCREMENT_USUAL_ANSWERS} action should reset questionTime to initial`, () => {
    const customState = {
      usual: 5,
      fast: 10,
      questionTime: 27
    };

    expect(reducer(customState, {
      type: ActionType.RESET_QUESTION_TIME
    })).toEqual(Object.assign({}, customState, {questionTime: 0}));
  });

  test(`${ActionType.INCREMENT_USUAL_ANSWERS} action should increment usual answers counter`, () => {
    expect(reducer(initialState, {
      type: ActionType.INCREMENT_USUAL_ANSWERS,
      payload: 1
    })).toEqual(Object.assign({}, initialState, {
      usual: 1,
    }));
  });

  test(`${ActionType.INCREMENT_FAST_ANSWERS} action should increment fast answers counter`, () => {
    expect(reducer(initialState, {
      type: ActionType.INCREMENT_FAST_ANSWERS,
      payload: 1
    })).toEqual(Object.assign({}, initialState, {
      fast: 1
    }));
  });

  test(`${ActionType.RESET_ANSWERS} action should reset all answers and questionTime into 0`, () => {
    expect(reducer(initialState, {
      type: ActionType.RESET_ANSWERS
    })).toEqual(Object.assign({}, initialState, {
      usual: 0,
      fast: 0,
      questionTime: 0
    }));
  });
});

describe(`ActionCreator correctly works`, () => {
  test(`incrementQuestionTime returns correct action`, () => {
    expect(ActionCreator.incrementQuestionTime()).toEqual({
      type: ActionType.INCREMENT_QUESTION_TIME,
      payload: 1
    });
  });

  test(`resetQuestionTime returns correct action`, () => {
    expect(ActionCreator.resetQuestionTime()).toEqual({
      type: ActionType.RESET_QUESTION_TIME
    });
  });

  describe(`incrementCorrectAnswersCounter correctly works`, () => {
    test(`Usual answer type, should be returned ${ActionType.INCREMENT_USUAL_ANSWERS}`, () => {
      expect(ActionCreator.incrementAnswersCounter(`usual`)).toEqual({
        type: ActionType.INCREMENT_USUAL_ANSWERS,
        payload: 1
      });
    });

    test(`Fast answer type, should be returned ${ActionType.INCREMENT_FAST_ANSWERS}`, () => {
      expect(ActionCreator.incrementAnswersCounter(`fast`)).toEqual({
        type: ActionType.INCREMENT_FAST_ANSWERS,
        payload: 1
      });
    });

    test(`Undefined answer type, should be returned Error`, () => {
      const checkFunction = () => {
        ActionCreator.incrementAnswersCounter(undefined);
      };

      expect(checkFunction)
        .toThrowError(new Error(`Unhandled answer type: undefined`));
    });
  });

  test(`resetAnswers returns correct action`, () => {
    expect(ActionCreator.resetAnswers()).toEqual({
      type: ActionType.RESET_ANSWERS
    });
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
