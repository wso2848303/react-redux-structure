import * as requests from './requests';
import axios from 'axios';
export const types = {
  TRIGGLE_EDIT: 'TRIGGLE_EDIT',
  GET_TABLE_DETAIL_REQUEST: 'GET_TABLE_DETAIL_REQUEST',
  GET_TABLE_DETAIL_SUCCESS: 'GET_TABLE_DETAIL_SUCCESS',
  GET_TABLE_DETAIL_FAIL: 'GET_TABLE_DETAIL_FAIL'
}
const initialState = {
  edit: false,
  loading: false,
  detail: {}
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.TRIGGLE_EDIT: {
      return Object.assign({}, state, { edit: !state.edit });
    }
    case types.GET_TABLE_DETAIL_REQUEST: {
      return Object.assign({}, state, { loading: true });
    }
    case types.GET_TABLE_DETAIL_SUCCESS: {
      let ret = Object.assign({}, state, { loading: false });
      let result = action.result, data = result.data;
      ret.detail = data;
      return ret;
    }
    case types.GET_TABLE_DETAIL_FAIL: {
      return Object.assign({}, state, { loading: false });
    }
    default: return state;
  }
}
export default reducer;
export const actions = {
  /**
   * 切换编辑状态
   */
  triggleEdit: () => ({
    type: types.TRIGGLE_EDIT
  }),
  /**
   * 获取表格详情数据请求
   */
  getTableDetailRequest: () => ({
    type: types.GET_TABLE_DETAIL_REQUEST,
    loading: true
  }),
  /**
   * 获取表格详情数据失败
   * @param {object} ex 失败数据
   */
  getTableDetailFail: (ex) => ({
    type: types.GET_TABLE_DETAIL_FAIL,
    loading: false,
    result: ex
  }),
  /**
   * 获取表格详情数据成功
   * @param {object} result 成功返回数据
   */
  getTableDetailSuccess: (result) => ({
    type: types.GET_TABLE_DETAIL_SUCCESS,
    loading: false,
    result: result
  }),
  /**
   * 获取表格详情数据
   * @param {string} id 表格id
   */
  getTableDetail: (id) => {
    return async dispatch => {
      try {
        dispatch(actions.getTableDetailRequest());
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_TABLE_DETAIL, {
          id: id
        });
        if (result.data && result.data.ok) {
          return dispatch(actions.getTableDetailSuccess(result.data));
        } else {
          return dispatch(actions.getTableDetailFail(result.data));
        }
      } catch(ex) {
        return dispatch(actions.getTableDetailFail(ex));
      }
    }
  }
}