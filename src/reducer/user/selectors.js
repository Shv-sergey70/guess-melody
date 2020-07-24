import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.DATA;

const getQuestions = (state) => state[NAMESPACE].questions;

export {
  getQuestions
};
