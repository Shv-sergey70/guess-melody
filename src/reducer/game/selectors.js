import NameSpace from '../namespaces';

const NAMESPACE = NameSpace.GAME;

const getMistakes = (state) => state[NAMESPACE].mistakes;
const getStep = (state) => state[NAMESPACE].step;
const getTime = (state) => state[NAMESPACE].time;

export {
  getMistakes,
  getStep,
  getTime
};
