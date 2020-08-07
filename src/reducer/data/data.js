import history from "../../history";
import Route from '../../routes';

const initialState = {
  questions: [],
  user: {}
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  LOGIN: `LOGIN`
};

const ActionCreator = {
  loadQuestions(questions) {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };
  },
  login(userData) {
    return {
      type: ActionType.LOGIN,
      payload: userData
    };
  }
};

const authUser = (dispatch, userData) => {
  dispatch(ActionCreator.login(userData));

  if (history.location.pathname === Route.AUTH) {
    history.push(Route.MAIN);
  }
};

const Operations = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then(({data: questions}) => {
        dispatch(ActionCreator.loadQuestions(questions.slice(0, 1)));
      })
      .catch(() => {

      });
  },
  login: (email, password) => (dispatch, getState, api) => {
    return api.post(`/login`, {email, password})
      .then(({data: userData}) => {
        authUser(dispatch, userData);
      });
  },
  checkLogin: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(({data: userData}) => {
        authUser(dispatch, userData);
      })
      .catch(() => {
        // should add error handling
      });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: payload
      });
    case ActionType.LOGIN:
      return Object.assign({}, state, {
        user: payload
      });
  }

  return state;
};

export {
  ActionCreator,
  Operations,
  reducer,
};
