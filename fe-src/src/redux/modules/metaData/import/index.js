import * as requests from './requests';
export const types = {
  IMPORT_EXCEL: 'IMPORT_EXCEL',
  SET_IMPORT_RESPONSE: 'SET_IMPORT_RESPONSE',
  HANDLE_CLICK_CANCEL: 'HANDLE_CLICK_CANCEL'
};
const initialState = {
  loading: false,
  import: true,
  headers: [],
  dataSource: [],
  fileList: []
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.IMPORT_EXCEL: {
      return Object.assign({}, state, { fileList: [action.file] });
    }
    case types.SET_IMPORT_RESPONSE: {
      let ret = Object.assign({}, state, { import: false });
      ret.headers = action.data.data.headers.map(item => {
        return Object.assign({}, item, { key: item.key, title: item.name, dataIndex: item.key });
      });
      ret.dataSource = action.data.data.datas.map((item, index) => {
        return Object.assign({}, item, { key: index });
      });
      return ret;
    }
    case types.HANDLE_CLICK_CANCEL: {
      return Object.assign({}, state, initialState);
    }
    default: return Object.assign({}, state);
  }
};
export default reducer;
export const actions = {
  /**
   * 上传excel
   * @param {object} file 上传文件
   */
  importExcel: (file) => ({
    type: types.IMPORT_EXCEL,
    file: file
  }),
  /**
   * 上传反馈回调
   * @param {object} data 回调数据
   */
  setImportResponse: (data) => ({
    type: types.SET_IMPORT_RESPONSE,
    data: data
  }),
  /**
   * 上传取消
   */
  handleClickCancel: () => ({
    type: types.HANDLE_CLICK_CANCEL
  })
};