import {AnswerType, TIME_FOR_FAST_QUESTION} from '../../const/const';

const initialState = {
  usual: 0,
  fast: 0,
  questionTime: 0
};

const ActionType = {
  INCREMENT_USUAL_ANSWERS: `INCREMENT_USUAL_ANSWERS`,
  INCREMENT_FAST_ANSWERS: `INCREMENT_FAST_ANSWERS`,
  INCREMENT_QUESTION_TIME: `INCREMENT_QUESTION_TIME`,
  RESET_QUESTION_TIME: `RESET_QUESTION_TIME`
};

const getAnswerType = (wastedTime) => wastedTime > TIME_FOR_FAST_QUESTION ? AnswerType.USUAL : AnswerType.FAST;

const ActionCreator = {
  incrementQuestionTime() {
    return {
      type: ActionType.INCREMENT_QUESTION_TIME,
      payload: 1
    };
  },

  resetQuestionTime() {
    return {
      type: ActionType.RESET_QUESTION_TIME
    };
  },

  incrementAnswersCounter: (answerType) => {
    switch (answerType) {
      case AnswerType.USUAL:
        return {
          type: ActionType.INCREMENT_USUAL_ANSWERS,
          payload: 1
        };
      case AnswerType.FAST:
        return {
          type: ActionType.INCREMENT_FAST_ANSWERS,
          payload: 1
        };
    }

    throw new Error(`Unhandled answer type: ${answerType}`);
  },
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.INCREMENT_QUESTION_TIME:
      return Object.assign({}, state, {
        questionTime: state.questionTime + payload
      });
    case ActionType.RESET_QUESTION_TIME:
      return Object.assign({}, state, {
        questionTime: 0
      });
    case ActionType.INCREMENT_USUAL_ANSWERS: {
      return Object.assign({}, state, {
        usual: state.usual + payload
      });
    }
    case ActionType.INCREMENT_FAST_ANSWERS: {
      return Object.assign({}, state, {
        fast: state.fast + payload
      });
    }
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  ActionType,
  getAnswerType
};
