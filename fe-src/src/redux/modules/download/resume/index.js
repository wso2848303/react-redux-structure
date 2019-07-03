import * as requests from './requests';
import axios from 'axios';
export const types = {
  GET_RESUME_RECORDS_EN_REQUEST: 'GET_RESUME_RECORDS_EN_REQUEST',
  GET_RESUME_RECORDS_EN_FAIL: 'GET_RESUME_RECORDS_EN_FAIL',
  GET_RESUME_RECORDS_EN_SUCCESS: 'GET_RESUME_RECORDS_EN_SUCCESS'
};
const initialState = {
  loading: false,
  datas: []
};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_RESUME_RECORDS_EN_REQUEST: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_RESUME_RECORDS_EN_FAIL: {
      return Object.assign({}, state, { loading: action.loading });
    }
    case types.GET_RESUME_RECORDS_EN_SUCCESS: {
      let ret = Object.assign({}, state, { loading: action.loading });
      let result = action.result, data = result.data;
      ret.datas = data.datas.map((item, index) => {
        return Object.assign({}, item, { key: index });
      })
      return ret;
    }
    default: return Object.assign({}, state);
  }
}
export default reducer;
export const actions = {
  /**
   * 获取英文简历请求
   */
  getResumeRecordsEnRequest: () => ({
    type: types.GET_RESUME_RECORDS_EN_REQUEST,
    loading: true
  }),
  /**
   * 获取英文简历成功
   * @param {object} result 返回数据
   */
  getResumeRecordsEnSuccess: (result) => ({
    type: types.GET_RESUME_RECORDS_EN_SUCCESS,
    loading: false,
    result: result
  }),
  /**
   * 获取英文简历失败
   * @param {object} result 失败数据
   */
  getResumeRecordsEnFail: (result) => ({
    type: types.GET_RESUME_RECORDS_EN_FAIL,
    loading: false,
    result: result
  }),
  /**
   * 获取英文简历数据
   */
  getResumeRecordsEn: () => {
    return async dispatch => {
      try {
        dispatch(actions.getResumeRecordsEnRequest());
        if (window.mock) {
          require('./mock');
        }
        const result = await axios.get(requests.GET_RESUME_RECORDS_EN);
        if (result.data && result.data.ok) {
          return dispatch(actions.getResumeRecordsEnSuccess(result.data));
        } else {
          return dispatch(actions.getResumeRecordsEnFail(result.data));
        }
      } catch(ex) {
        return dispatch(actions.getResumeRecordsEnFail(ex));
      }
    }
  }
};