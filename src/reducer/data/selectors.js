import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.DATA;

const getQuestions = (state) => state[NAMESPACE].questions;
const getUser = (state) => state[NAMESPACE].user;

export {
  getQuestions,
  getUser
};
