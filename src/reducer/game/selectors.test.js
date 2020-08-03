import {getMistakes, getStep, getTime, isTimeOver, areAttemptsOver, getWastedTime} from "./selectors";

const state = {
  GAME: {
    mistakes: 2,
    step: 1,
    time: 30
  }
};

describe(`Selectors correctly works`, () => {
  test(`getMistakes returns mistakes value`, () => {
    expect(getMistakes(state)).toEqual(state.GAME.mistakes);
  });

  test(`getStep returns step value`, () => {
    expect(getStep(state)).toEqual(state.GAME.step);
  });

  test(`getTime returns time value`, () => {
    expect(getTime(state)).toEqual(state.GAME.time);
  });

  describe(`isTimeOver works correctly`, () => {
    test(`With time > 0 should return false`, () => {
      expect(isTimeOver(state)).toBeFalsy();
    });

    test(`With time === 0 should return true`, () => {
      expect(isTimeOver({GAME: {time: 0}})).toBeTruthy();
    });

    test(`With negative time should return false`, () => {
      expect(isTimeOver({GAME: {time: -5}})).toBeTruthy();
    });
  });

  describe(`areAttemptsOver works correctly`, () => {
    test(`With mistakes count less than attempts - should return false`, () => {
      expect(areAttemptsOver(state)).toBeFalsy();
    });

    test(`With mistakes count equal to attempts count - should return true`, () => {
      expect(areAttemptsOver({GAME: {mistakes: 3}})).toBeTruthy();
    });

    test(`With mistakes count more than attempts - should return true`, () => {
      expect(areAttemptsOver({GAME: {mistakes: 9}})).toBeTruthy();
    });
  });

  describe(`getWastedTime works correctly`, () => {
    test(`wasted 30 seconds, should return 270 seconds`, () => {
      expect(getWastedTime(state)).toEqual(270);
    });

    test(`wasted 300 seconds, should return 0 seconds`, () => {
      expect(getWastedTime({GAME: {time: 300}})).toEqual(0);
    });

    test(`wasted 350 seconds, should return -50 seconds`, () => {
      expect(getWastedTime({GAME: {time: 350}})).toEqual(-50);
    });
  });
});
