import createAPI from '../../api';
import MockAdapter from 'axios-mock-adapter';
import {ActionCreator, reducer, Operations} from './data';

const initialState = {
  questions: [],
  user: {}
};

describe(`Reducer works correctly`, () => {
  describe(`Reducer with LOAD_QUESTIONS action correctly works`, () => {
    test(`Payload should be written into questions state`, () => {
      const questions = [1, 2, 3];

      expect(reducer(initialState, {
        type: `LOAD_QUESTIONS`,
        payload: questions
      })).toEqual(Object.assign({}, initialState, {questions}));
    });
  });

  describe(`Reducer with LOGIN action correctly works`, () => {
    test(`Payload should be written into login state`, () => {
      const userData = {name: `test`};

      expect(reducer(initialState, {
        type: `LOGIN`,
        payload: userData
      })).toEqual(Object.assign({}, initialState, {user: userData}));
    });
  });

  test(`Reducer with undefined action returns initial state`, () => {
    expect(reducer(initialState, {type: undefined}))
      .toEqual(Object.assign({}, initialState));
  });
});

describe(`ActionCreator correctly works`, () => {
  describe(`loadQuestions correctly works`, () => {
    test(`Returns correct object`, () => {
      const questions = [1, 2, 3];

      expect(ActionCreator.loadQuestions(questions)).toEqual({
        type: `LOAD_QUESTIONS`,
        payload: questions
      });
    });
  });

  describe(`login correctly works`, () => {
    test(`Returns correct object`, () => {
      const userData = {name: `test`};

      expect(ActionCreator.login(userData)).toEqual({
        type: `LOGIN`,
        payload: userData
      });
    });
  });
});

describe(`Operations correctly works`, () => {
  test(`loadQuestions returns 200 status, success loading`, () => {
    const dispatchMock = jest.fn();
    const API = createAPI(dispatchMock);
    const APIMock = new MockAdapter(API);

    const mockData = [1, {fake: true}, 3];

    APIMock.onGet(`/questions`).reply(200, mockData);
    const questionLoader = Operations.loadQuestions();

    return questionLoader(dispatchMock, jest.fn(), API)
      .then(() => {
        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledWith({
          type: `LOAD_QUESTIONS`,
          payload: mockData
        });
      });
  });

  test(`loadQuestions returns 403 status, authorization required`, () => {
    const dispatchMock = jest.fn();
    const onNotAuthorize = jest.fn();
    const API = createAPI(onNotAuthorize);
    const APIMock = new MockAdapter(API);

    APIMock.onGet(`/questions`).reply(403);
    const questionLoader = Operations.loadQuestions();

    return questionLoader(dispatchMock, jest.fn(), API)
      .then(() => {
        expect(dispatchMock).toHaveBeenCalledTimes(0);
        expect(onNotAuthorize).toHaveBeenCalledTimes(1);
      });
  });

  test(`login returns 200 status, success login`, () => {
    const dispatchMock = jest.fn();
    const onNotAuthorize = jest.fn();
    const API = createAPI(onNotAuthorize);
    const APIMock = new MockAdapter(API);

    const userData = {
      id: 1,
      email: `testEmail`
    };

    APIMock.onPost(`/login`).reply(200, userData);
    const login = Operations.login(`testEmail1`, `testPassword`);

    return login(dispatchMock, jest.fn(), API)
      .then(() => {
        expect(onNotAuthorize).toHaveBeenCalledTimes(0);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
          type: `LOGIN`,
          payload: userData
        });
      });
  });

  test(`checkLogin returns 200 status, already login`, () => {
    const dispatchMock = jest.fn();
    const onNotAuthorize = jest.fn();
    const API = createAPI(onNotAuthorize);
    const APIMock = new MockAdapter(API);

    const userData = {
      id: 1,
      email: `testEmail`
    };

    APIMock.onGet(`/login`).reply(200, userData);
    const checkLogin = Operations.checkLogin();

    return checkLogin(dispatchMock, jest.fn(), API)
      .then(() => {
        expect(onNotAuthorize).toHaveBeenCalledTimes(0);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
          type: `LOGIN`,
          payload: userData
        });
      });
  });
});
