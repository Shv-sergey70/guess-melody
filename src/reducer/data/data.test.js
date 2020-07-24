import createAPI from '../../api';
import MockAdapter from 'axios-mock-adapter';
import {ActionCreator, reducer, Operations} from './data';

const initialState = {
  questions: []
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
});

describe(`Operations correctly works`, () => {
  test(`loadQuestions return 200 status, success loading`, () => {
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

  test(`loadQuestions return 403 status, authorization required`, () => {
    const dispatchMock = jest.fn();
    const API = createAPI(dispatchMock);
    const APIMock = new MockAdapter(API);

    APIMock.onGet(`/questions`).reply(403);
    const questionLoader = Operations.loadQuestions();

    return questionLoader(dispatchMock, jest.fn(), API)
      .then(() => {
        expect(dispatchMock).toHaveBeenCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
          type: `REQUIRED_AUTHORIZATION`,
          payload: true
        });
      });
  });
});
