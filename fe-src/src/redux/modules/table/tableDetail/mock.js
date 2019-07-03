import * as requests from './requests';
import Mock from 'mockjs';
Mock.setup({
  timeout: 300
});
Mock.mock(requests.GET_TABLE_DETAIL, {
  ok: true,
  data: {
    'tableId|3-5': /[A-Za-z]/,
    'tableName|3-5': /[A-Za-z]/,
    'types|3-5': [{
      'typeName|3-5': /[A-Za-z]/,
      'details|6-10': [{
        'name|3-5': /[A-Za-z]/,
        'value|8-15': /[A-Za-z\d]/,
        type: 'string'
      }]
    }]
  }
})