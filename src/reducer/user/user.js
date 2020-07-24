const initialState = {
  isAuthorizationRequired: false
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`
};

const ActionCreator = {
  requireAuthorization(status) {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  }
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: payload
      });
  }

  return state;
};

export {
  ActionCreator,
  reducer,
};
