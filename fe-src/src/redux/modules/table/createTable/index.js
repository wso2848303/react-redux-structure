import axios from 'axios';
import * as requests from './requests';
export const types = {
  EDIT_TABLE_EDIT_FIELDS: 'EDIT_TABLE_EDIT_FIELDS',
  CHECK_TABLE_TREE: 'CHECK_TABLE_TREE',
  SORT_TABLE: 'SORT_TABLE',
  GET_TREE_DATA_REQUEST: 'GET_TREE_DATA_REQUEST',
  GET_TREE_DATA_SUCCESS: 'GET_TREE_DATA_SUCCESS',
  GET_TREE_DATA_FAIL: 'GET_TREE_DATA_FAIL'
};
const initialState = {
  fields: {
    tableName: {
      value: ''
    },
    checked: {
      value: []
    },
    sort: {
      value: []
    }
  },
  headers: [],
  loading: true
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.EDIT_TABLE_EDIT_FIELDS: {
      let ret = Object.assign({}, state);
      for (let key in action.fields) {
        ret.fields[key].value = action.fields[key].value;
      }
      return ret;
    }
    case types.CHECK_TABLE_TREE: {
      let ret = Object.assign({}, state);
      ret.fields.checked.value = action.checkedKeys;
      let sort = [].concat(ret.fields.sort.value);
      let deleteIndex = [];
      if (sort.length) {
        sort.forEach((item, index) => {
          if (!ret.fields.checked.value.find((res) => {
            return res === item;
          })) {
            deleteIndex.push(index);
          }
        });
        if (deleteIndex.length) {
          let count = 0;
          deleteIndex.forEach(item => {
            sort.splice(item - count, 1);
            count++;
          });
        }
      }
      if (action.checked.checkedNodes && action.checked.checkedNodes.length) {
        action.checked.checkedNodes.forEach(item => {
          let dataRef = item.props.dataRef;
          if (!sort.find(res => {
            return res.key === dataRef.key
          })) {
            if (!dataRef.isParent) {
              sort.push({ key: dataRef.key, title: dataRef.title });
            }
          }
        });
      }
      ret.fields.sort.value = sort;
      return ret;
    }
    case types.SORT_TABLE: {
      let ret = Object.assign({}, state);
      if (action.order && action.order.length) {
        let sort = action.order.map(item => {
          let key = item;
          let title = '';
          let index = ret.fields.sort.value.findIndex(res => {
            return res.key === item;
          });
          title = ret.fields.sort.value[index].title;
          return {
            key: key,
            title: title
          }
        });
        ret.fields.sort.value = sort;
      }
      return ret;
    }
    case types.GET_TREE_DATA_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TREE_DATA_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TREE_DATA_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.headers = data.headers;
      return ret;
    }
    default: return state;
  }
};
export default reducer;
export const actions = { 
  /**
   * 编辑form内容
   * @param fields {object} 编辑的field对象
   */
  editFields: (fields) => ({
    type: types.EDIT_TABLE_EDIT_FIELDS,
    fields: fields
  }),
  /**
   * 树状图勾选
   * @param checkedKeys {array} 勾选的key集合
   * @param checked {object} 勾选事件对象（包含原始数据）
   */
  checkTree: (checkedKeys, checked) => ({
    type: types.CHECK_TABLE_TREE,
    checked: checked,
    checkedKeys: checkedKeys
  }),
  /**
   * 进行排序
   * @param order {array} 排序结果id集合
   */
  changeSort: (order) => ({
    type: types.SORT_TABLE,
    order: order
  }),
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
  }
};  