import {TimerContainer} from "./timer-container";

describe(`Timer-container correctly works`, () => {
  test(`correct formatting of time`, () => {
    expect(TimerContainer._getFormattedTime(301)).toEqual({
      minutes: `05`,
      seconds: `01`
    });
  });
});
