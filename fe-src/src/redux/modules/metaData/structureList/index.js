import axios from 'axios';
import * as requests from './requests';
import clone from 'clone';
export const types = {
  GET_TREE_DATA_REQUEST: 'GET_TREE_DATA_REQUEST',
  GET_TREE_DATA_SUCCESS: 'GET_TREE_DATA_SUCCESS',
  GET_TREE_DATA_FAIL: 'GET_TREE_DATA_FAIL',
  ON_SEARCH: 'ON_SEARCH'
}
const initialState = {
  headers: [],
  loading: true,
  searchText: '',
  showHeaders: []
}
const getMatchChildren = (str, arr) => {
  if (arr && arr.length) {
    for (let i in arr) {
      let item = arr[i];
      if (item.children && item.children.length) {
        item.children = getMatchChildren(str, item.children);
      } else if (item.children && item.children.length === 0) {
        delete item.children;
      }
    }
  }
  return arr.filter(item => {
    if (item.children && item.children.length) {
      return true;
    } else if (item.title.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) > -1) {
      return true;
    }
  });
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_TREE_DATA_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TREE_DATA_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TREE_DATA_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.headers = data.headers;0
      ret.showHeaders = clone(ret.headers);
      return ret;
    }
    case types.ON_SEARCH: {
      let ret = Object.assign({}, state, { searchText: action.text, showHeaders: [] });
      if (ret.searchText && ret.searchText !== '') {
        ret.showHeaders = getMatchChildren(ret.searchText, clone(ret.headers));
      } else {
        ret.showHeaders = clone(ret.headers);
      }
      return ret;
    }
    default: return state;
  }
}
export default reducer;
export const actions = {
  /**
   * 获取树状结构数据请求
   */
  getTreeDataRequest: () => ({
    type: types.GET_TREE_DATA_REQUEST,
    loading: true
  }),
  /**
   * 获取树状结构数据失败
   * @param {object} ex 失败数据
   */
  getTreeDataFail: (ex) => ({
    type: types.GET_TREE_DATA_FAIL,
    loading: false,
    result: ex
  }),
  /**
   * 获取树状结构数据成功
   * @param {object} result 成功返回数据
   */
  getTreeDataSuccess: (result) => {
    return {
      type: types.GET_TREE_DATA_SUCCESS,
      loading: false,
      result: result
    }
  },
  /**
   * 获取树状结构数据
   */
  getTreeData: () => {
    return async dispatch => {
      try {
        dispatch(actions.getTreeDataRequest());
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_TREE_DATA);
        if (result.data && result.data.ok) {
          return dispatch(actions.getTreeDataSuccess(result.data));
        } else {
          return dispatch(actions.getTreeDataFail(result.data));
        }
      } catch(ex) {
        return dispatch(actions.getTreeDataFail(ex));
      }
    }
  },
  /**
   * 设置搜索字符串
   */
  onSearch: (text) => ({
    type: types.ON_SEARCH,
    text: text
  })
}