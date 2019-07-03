import { combineReducers } from 'redux';
import login from './login';
import app from './app';
import table from './table';
import metaData from './metaData';
import examine from './examine';
import download from './download';
import dashboard from './dashboard';
/**
 * reducer 合并
 */
const rootReducer = combineReducers({
  app,
  login,
  table,
  metaData,
  examine,
  download,
  dashboard
});
export default rootReducer;