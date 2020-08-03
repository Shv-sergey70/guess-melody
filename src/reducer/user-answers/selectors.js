import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.USER_ANSWERS;

const getQuestionTime = (state) => state[NAMESPACE].questionTime;

export {
  getQuestionTime,
};
