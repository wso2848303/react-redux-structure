import axios from 'axios';
import * as requests from './requests';
import clone from 'clone';

export const types = {
  GET_TABLE_DATA_REQUEST: 'GET_TABLE_DATA_REQUEST',
  GET_TABLE_DATA_FAIL: 'GET_TABLE_DATA_FAIL',
  GET_TABLE_DATA_SUCCESS: 'GET_TABLE_DATA_SUCCESS',
  ADD_HEADER_OPERATION: 'ADD_HEADER_OPERATION',
  SET_EDITING_KEY: 'SET_EDITING_KEY',
  SET_TRIGGER_EDITING: 'SET_TRIGGER_EDITING',
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTERED_VALUE: 'SET_FILTERED_VALUE',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT'
};
const initialState = {
  loading: false,
  tableName: '',
  headers: [],
  tableData: [],
  originTableData: [],
  editType: {},
  editingKey: '',
  isTriggerEditing: false,
  searchText: {},
  filters: {},
  filteredValue: {}
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_TABLE_DATA_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TABLE_DATA_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_TABLE_DATA_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.tableName = data.tableName;
        ret.headers = data.headers.map((item, index) => {
          if (item.editType) {
            ret.editType[item.key] = item.editType;
          }
          if (index > 0) {
            item.align = 'center';
          }
          return Object.assign({}, item, { key: item.key, title: item.name, dataIndex: item.key, width: 200 });
        });
        ret.originTableData = data.datas.map((item, index) => {
          return Object.assign({}, item, { key: index });
        });
        ret.tableData = clone(ret.originTableData);
      return ret;
    }
    case types.ADD_HEADER_OPERATION: {
      let headers = clone(state.headers);
      headers.push(action.header);
      return Object.assign({}, state, { headers: headers });
    }
    case types.SET_EDITING_KEY: {
      return Object.assign({}, state, { editingKey: action.key });
    }
    case types.SET_TRIGGER_EDITING: {
      return Object.assign({}, state, { isTriggerEditing: action.state });
    }
    case types.SET_FILTERS: {
      return Object.assign({}, state, { filters: action.filters });
    }
    case types.SET_FILTERED_VALUE: {
      return Object.assign({}, state, { filteredValue: action.value });
    }
    case types.SET_SEARCH_TEXT: {
      return Object.assign({}, state, { searchText: action.value });
    }
    default: return Object.assign({}, state);
  }
};
export default reducer;
export const actions = {
  /**
   * 获取表格数据请求
   */
  getTableDataRequest: () => ({
    type: types.GET_TABLE_DATA_REQUEST,
    loading: true
  }),
  /**
   * 获取表格数据失败
   * @param {object} ex 失败数据
   */
  getTableDataFail: (ex) => ({
    type: types.GET_TABLE_DATA_FAIL,
    loading: false,
    result: ex
  }),
  /**
   * 获取表格数据成功
   * @param {object} result 成功返回数据
   */
  getTableDataSuccess: (result) => ({
    type: types.GET_TABLE_DATA_SUCCESS,
    loading: false,
    result: result
  }),
  /**
   * 获取表格数据
   * @param {string} id 表格id
   */
  getTableData: (id) => {
    return async dispatch => {
      try {
        dispatch(actions.getTableDataRequest());
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_TABLE_DATA, {
          id: id
        });
        if (result.data && result.data.ok) {
          return dispatch(actions.getTableDataSuccess(result.data));
        } else {
          return dispatch(actions.getTableDataFail(result.data));  
        }
      } catch(ex) {
        return dispatch(actions.getTableDataFail(ex));
      }
    }
  },
  addHeaderOperation: (header) => ({
    type: types.ADD_HEADER_OPERATION,
    header: header
  }),
  /**
   * 设置表格行编辑状态
   * @param {string} key 行id
   */
  setEditingKey: (key) => ({
    type: types.SET_EDITING_KEY,
    key: key
  }),
  /**
   * 切换表格编辑状态
   * @param {boolean} state 表格编辑状态
   */
  setTriggerEditing: (state) => ({
    type: types.SET_TRIGGER_EDITING,
    state: state
  }),
  /**
   * 设置表格筛选数据列表
   * @param {object} filters 筛选数据列表
   */
  setFilters: (filters) => ({
    type: types.SET_FILTERS,
    filters: filters
  }),
  /**
   * 设置表格筛选条件
   * @param {object} value 筛选条件数据
   */
  setFilteredValue: (value) => ({
    type: types.SET_FILTERED_VALUE,
    value: value
  }),
  /**
   * 设置搜索对象
   * @param {object} value 搜索对象
   */
  setSearchText: (value) => ({
    type: types.SET_SEARCH_TEXT,
    value: value
  })
};