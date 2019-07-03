import Mock from 'mockjs';
import * as requests from './requests';
Mock.setup({
  timeout: 300
});
export const GET_EXAMINE_LIST = Mock.mock(requests.GET_EXAMINE_LIST, {
  ok: true,
  data: {
    'datas|301': [{
      'hxWeekId|6': /\d/,
      'name|3-5': /[A-Za-z]/,
      status: /0|1|2/,
      'important|1': true
    }]
  }
})