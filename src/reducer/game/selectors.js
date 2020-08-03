import {createSelector} from 'reselect';
import NameSpace from '../namespaces';
import {attempts, gameTime} from '../../init-data';

const NAMESPACE = NameSpace.GAME;

const getMistakes = (state) => state[NAMESPACE].mistakes;
const getStep = (state) => state[NAMESPACE].step;
const getTime = (state) => state[NAMESPACE].time;
const isTimeOver = createSelector([getTime], (time) => time <= 0);
const areAttemptsOver = createSelector([getMistakes], (mistakes) => mistakes >= attempts);
const getWastedTime = createSelector([getTime], (timeLeft) => gameTime - timeLeft);

export {
  getMistakes,
  getStep,
  getTime,
  isTimeOver,
  areAttemptsOver,
  getWastedTime
};
