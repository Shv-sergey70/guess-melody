import {ActionCreator, reducer} from './user';

const initialState = {
  isAuthorizationRequired: false
};

describe(`Reducer works correctly`, () => {
  test(`Reducer with REQUIRED_AUTHORIZATION action correctly works`, () => {
    expect(reducer(initialState, {
      type: `REQUIRED_AUTHORIZATION`,
      payload: true
    })).toEqual(Object.assign({}, initialState, {
      isAuthorizationRequired: true
    }));
  });
});

describe(`ActionCreator correctly works`, () => {
  describe(`requireAuthorization correctly works`, () => {
    test(`Returns correct object`, () => {
      const status = true;

      expect(ActionCreator.requireAuthorization(status)).toEqual({
        type: `REQUIRED_AUTHORIZATION`,
        payload: status
      });
    });
  });
});
