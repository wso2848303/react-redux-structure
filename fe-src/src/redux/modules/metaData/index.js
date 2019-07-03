import { combineReducers } from 'redux';
import structureList from './structureList';
import importReducer from './import';
const reducer = combineReducers({
  structureList,
  importReducer
});
export default reducer;