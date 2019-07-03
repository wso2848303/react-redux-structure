import { combineReducers } from 'redux';
import list from './list';
import detail from './detail';
const reducer = combineReducers({
  list,
  detail
});
export default reducer;