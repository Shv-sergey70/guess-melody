import {getFastAnswersScores, getQuestionTime, getTotalScores, getUsualAnswersScores} from "./selectors";

const mistakesCount = 2;

jest.mock(`../game/selectors`, () => ({
  getMistakes: jest.fn().mockImplementation(() => 2)
}));

const state = {
  USER_ANSWERS: {
    usual: 3,
    fast: 2,
    questionTime: 0
  }
};

describe(`Selectors correctly works`, () => {
  test(`getQuestionTime returns questionTime value`, () => {
    expect(getQuestionTime(state)).toEqual(state.USER_ANSWERS.questionTime);
  });

  test(`getUsualAnswersScores returns correct value`, () => {
    expect(getUsualAnswersScores(state)).toEqual(state.USER_ANSWERS.usual);
  });

  test(`getFastAnswersScores returns correct value`, () => {
    expect(getFastAnswersScores(state)).toEqual(state.USER_ANSWERS.fast * 2);
  });

  test(`getTotalScores returns correct value`, () => {
    expect(getTotalScores(state)).toEqual(
        state.USER_ANSWERS.usual + state.USER_ANSWERS.fast * 2 - (mistakesCount * 2)
    );
  });
});
