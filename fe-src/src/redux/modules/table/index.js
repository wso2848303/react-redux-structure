import { combineReducers } from 'redux';
import create from './createTable';
import detail from './tableDetail';
import view from './view';
const reducer = combineReducers({
  create,
  detail,
  view
});
export default reducer;