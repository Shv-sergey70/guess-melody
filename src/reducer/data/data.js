const initialState = {
  questions: []
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`
};

const ActionCreator = {
  loadQuestions(questions) {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions
    };
  }
};

const Operations = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then(({data: questions}) => {
        dispatch(ActionCreator.loadQuestions(questions));
      });
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: payload
      });
  }

  return state;
};

export {
  ActionCreator,
  Operations,
  reducer,
};
