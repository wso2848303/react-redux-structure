import * as requests from './requests';
import Mock from 'mockjs';
Mock.setup({
  timeout: 300
});
export const GET_RESUME_RECORDS_EN = Mock.mock(requests.GET_RESUME_RECORDS_EN, {
  ok: true,
  data: {
    'datas|301': [{
      'id|3-5': /[a-zA-Z]/,
      'startDate': Mock.mock('@date'),
      'endDate': Mock.mock('@date'),
      'fileNum': /\d/,
      'operator': Mock.mock('@cword(2, 4)')
    }]
  }
})