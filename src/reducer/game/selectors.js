import {createSelector} from 'reselect';
import NameSpace from '../namespaces';
import {attempts} from '../../init-data';

const NAMESPACE = NameSpace.GAME;

const getMistakes = (state) => state[NAMESPACE].mistakes;
const getStep = (state) => state[NAMESPACE].step;
const getTime = (state) => state[NAMESPACE].time;
const checkTime = createSelector([getTime], (time) => time === 0);
const checkAttempt = createSelector([getMistakes], (mistakes) => mistakes >= attempts);

export {
  getMistakes,
  getStep,
  getTime,
  checkTime,
  checkAttempt
};
