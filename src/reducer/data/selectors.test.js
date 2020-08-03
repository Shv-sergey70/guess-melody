import {getQuestions, getUser, hasQuestions} from "./selectors";

const state = {
  DATA: {
    questions: [
      {name: `one`},
      {name: `two`}
    ],
    user: {name: `userName`}
  }
};

describe(`Selectors correctly works`, () => {
  test(`getQuestions returns questions data`, () => {
    expect(getQuestions(state)).toEqual(state.DATA.questions);
  });

  test(`getUser returns user data`, () => {
    expect(getUser(state)).toEqual(state.DATA.user);
  });

  test(`hasQuestions with questions returns true`, () => {
    expect(hasQuestions(state)).toEqual(true);
  });

  test(`hasQuestions without questions returns false`, () => {
    expect(hasQuestions({DATA: {questions: []}})).toEqual(false);
  });
});
