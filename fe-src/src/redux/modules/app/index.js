import axios from 'axios';
import * as requests from './requests';
import { async } from 'q';
export const types = {
  TRIGGER_SLIDE: 'TRIGGER_SLIDE',
  GET_SIDER_DATA_REQUEST: 'GET_SIDER_DATA_REQUEST',
  GET_SIDER_DATA_SUCCESS: 'GET_SIDER_DATA_SUCCESS',
  GET_SIDER_DATA_FAIL: 'GET_SIDER_DATA_FAIL'
}
const initialState = {
  collapsed: false,
  loading: false,
  sideData: { 
    defaultSelected: [],
    defaultOpened: [],
    siders: []
  }
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.TRIGGER_SLIDE: {
      let ret = Object.assign({}, state);
      if (typeof action.collapsed === 'boolean') {
        ret.collapsed = action.collapsed;
      } else {
        ret.collapsed = !ret.collapsed;
      }
      return ret;
    }
    case types.GET_SIDER_DATA_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_SIDER_DATA_FAIL: {
      let ret = Object.assign({}, state, { loading: action.loading });
      return ret;
    }
    case types.GET_SIDER_DATA_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.sideData = data;
      return ret;
    }
    default: return state;
  }
}
export default reducer;
export const actions = {
  /**
   * 切换侧栏申收
   * @param {boolean} collapsed 开关
   */
  triggerSlide: (collapsed) => ({
    type: types.TRIGGER_SLIDE,
    collapsed: collapsed
  }),
  /**
   * 获取侧边栏数据
   */
  getSideData: () => {
    return async dispatch => {
      try {
        dispatch(actions.getSideDataRequest());
        if (process.env.NODE_ENV === 'development') {
          require('./mock');
        }
        const result = await axios.get(requests.GET_SIDER_DATA);
        if (result.data && result.data.ok) {
          return dispatch(actions.getSideDataSuccess(result.data));
        } else {
          return dispatch(actions.getSideDataFail(result.data));
        }
      } catch(ex) {
        return dispatch(actions.getSideDataFail(ex));
      }
    }
  },
  /**
   * 获取侧边栏数据请求
   */
  getSideDataRequest: () => ({
    type: types.GET_SIDER_DATA_REQUEST,
    loading: true
  }),
  /**
   * 获取侧边栏数据成功
   * @param {object} 返回结果
   */
  getSideDataSuccess: (result) => {
    return {
      type: types.GET_SIDER_DATA_SUCCESS,
      loading: false,
      result: result
    }
  },
  /**
   * 获取侧边栏数据失败
   * @param {object} ex 失败对象
   */
  getSideDataFail: (ex) => ({
    type: types.GET_SIDER_DATA_FAIL,
    loading: false,
    result: ex
  })
}