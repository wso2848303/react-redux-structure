import { TYPES } from '../constants';
import * as requests from './requests';
import axios from 'axios';
import { getPageType } from '../constants';
export const types = {
  GET_EXAMINE_DETAIL_REQUEST: 'GET_EXAMINE_DETAIL_REQUEST',
  GET_EXAMINE_DETAIL_SUCCESS: 'GET_EXAMINE_DETAIL_SUCCESS',
  GET_EXAMINE_DETAIL_FAIL: 'GET_EXAMINE_DETAIL_FAIL'
};
const initialState = {
  pageType: TYPES.PASSPORT,
  loading: false,
  qualify: false,
  note: '',
  id: ''
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_EXAMINE_DETAIL_REQUEST: {
      return Object.assign({}, state, { loading: action.loading, id: action.id });
    }
    case types.GET_EXAMINE_DETAIL_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_EXAMINE_DETAIL_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.pageType = getPageType(data.type);
      return ret;
    }
    default: return Object.assign({}, state);
  }
}
export default reducer;
export const actions = {
  /**
   * 获取审核详情数据请求
   * @param {string} id 审核详情id
   */
  getExamineDetailRequest: (id) => ({
    type: types.GET_EXAMINE_DETAIL_REQUEST,
    loading: true,
    id: id
  }),
  /**
   * 获取审核详情数据失败
   * @param {object} result 失败数据
   */
  getExamineDetailFail: (result) => ({
    type: types.GET_EXAMINE_DETAIL_FAIL,
    loading: false,
    result: result
  }),
  /**
   * 获取审核详情数据成功
   * @param {object} result 成功返回数据
   */
  getExamineDetailSuccess: (result) => ({
    type: types.GET_EXAMINE_DETAIL_SUCCESS,
    loading: false,
    result: result
  }),
  /**
   * 获取审核详情数据
   * @param {string} id 审核详情id
   */
  getExamineDetail: (id) => {
    return async dispatch => {
      try {
        dispatch(actions.getExamineDetailRequest(id));
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_EXAMINE_DETAIL, {
          id: id
        });
        if (result.data && result.data.ok) {
          return dispatch(actions.getExamineDetailSuccess(result.data));
        } else {
          return dispatch(actions.getExamineDetailFail(result.data));  
        }
      } catch(ex) {
        return dispatch(actions.getExamineDetailFail(ex));
      }
    }
  }
};