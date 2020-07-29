import {createSelector} from 'reselect';

import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.DATA;

const getQuestions = (state) => state[NAMESPACE].questions;
const getUser = (state) => state[NAMESPACE].user;
const hasQuestions = createSelector([getQuestions], (questions) => questions.length > 0);

export {
  getQuestions,
  getUser,
  hasQuestions
};
