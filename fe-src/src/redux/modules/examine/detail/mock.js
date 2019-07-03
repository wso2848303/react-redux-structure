import * as requests from './requests';
import Mock from 'mockjs';
Mock.setup({
  timeout: 300
});
export const GET_EXAMINE_DETAIL = Mock.mock(requests.GET_EXAMINE_DETAIL, {
  ok: true,
  data: {
    type: 'passport'
  }
})