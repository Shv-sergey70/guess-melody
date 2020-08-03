import {getQuestionTime} from "./selectors";

const state = {
  USER_ANSWERS: {
    usual: 0,
    fast: 0,
    questionTime: 0
  }
};

describe(`Selectors correctly works`, () => {
  test(`getQuestionTime returns questionTime value`, () => {
    expect(getQuestionTime(state)).toEqual(state.USER_ANSWERS.questionTime);
  });
});
