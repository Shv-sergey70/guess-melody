import {combineReducers} from 'redux';
import {reducer as game} from './game/game';
import {reducer as data} from "./data/data";
import {reducer as userAnswers} from './user-answers/user-answers';
import NameSpace from './namespaces';

export default combineReducers({
  [NameSpace.GAME]: game,
  [NameSpace.DATA]: data,
  [NameSpace.USER_ANSWERS]: userAnswers
});
