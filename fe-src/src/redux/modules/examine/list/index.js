import { TYPES } from '../constants';
import * as requests from './requests';
import axios from 'axios';
export const types = {
  SET_PAGE_TYPE: 'SET_PAGE_TYPE',
  GET_EXAMINE_LIST_REQUEST: 'GET_EXAMINE_LIST_REQUEST',
  GET_EXAMINE_LIST_SUCCESS: 'GET_EXAMINE_LIST_SUCCESS',
  GET_EXAMINE_LIST_FAIL: 'GET_EXAMINE_LIST_FAIL'
};
const initialState = {
  pageType: TYPES.PASSPORT,
  loading: false,
  tableData: []
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_PAGE_TYPE: {
      return Object.assign({}, state, { pageType: action.pageType });
    }
    case types.GET_EXAMINE_LIST_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_EXAMINE_LIST_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_EXAMINE_LIST_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      let tableData = data.datas.map((item, index) => {
        return Object.assign({}, item, { key: index });
      });
      ret.tableData = tableData;
      return ret;
    }
    default: return state;
  }
}
export default reducer;
export const actions = {
  /**
   * 设置当前审核类型
   * @param {string} pageType 审核类型const
   */
  setPageType: (pageType) => ({
    type: types.SET_PAGE_TYPE,
    pageType: pageType
  }),
  /**
   * 获取审核列表请求
   */
  getExamineListRequest: () => ({
    type: types.GET_EXAMINE_LIST_REQUEST,
    loading: true
  }),
  /**
   * 获取审核列表请求成功
   * @param {object} result 返回成功数据
   */
  getExamineListSuccess: (result) => ({
    type: types.GET_EXAMINE_LIST_SUCCESS,
    loading: false,
    result: result
  }),
  /**
   * 获取审核列表数据失败
   * @param {object} result 失败数据
   */
  getExamineListFail: (result) => ({
    type: types.GET_EXAMINE_LIST_FAIL,
    loading: false,
    result: result
  }),
  /**
   * 获取审核列表数据
   * @param {string} type 审核类型
   */
  getExamineList: (type) => {
    return async dispatch => {
      try {
        dispatch(actions.getExamineListRequest());
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_EXAMINE_LIST, {
          type: type
        });
        if (result.data && result.data.ok) {
          return dispatch(actions.getExamineListSuccess(result.data));
        } else {
          return dispatch(actions.getExamineListFail(result.data));
        }
      } catch(ex) {
        return dispatch(actions.getExamineListFail(ex));
      }
    }
  }
};