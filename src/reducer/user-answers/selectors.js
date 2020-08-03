import {createSelector} from 'reselect';
import NameSpace from '../namespaces';
import {getMistakes} from "../game/selectors";

const NAMESPACE = NameSpace.USER_ANSWERS;

const getQuestionTime = (state) => state[NAMESPACE].questionTime;
const getUsualAnswersScores = (state) => state[NAMESPACE].usual;
const getFastAnswersScores = (state) => state[NAMESPACE].fast * 2;
const getTotalScores = createSelector(
    [getUsualAnswersScores, getFastAnswersScores, getMistakes],
    (usualScores, fastScores, mistakes) => usualScores + fastScores - (mistakes * 2)
);

export {
  getQuestionTime,
  getUsualAnswersScores,
  getFastAnswersScores,
  getTotalScores
};
