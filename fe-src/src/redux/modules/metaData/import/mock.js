import Mock from 'mockjs';
import * as requests from './requests';
Mock.setup({
  timeout: 300
})
Mock.mock(requests.IMPORT_EXCEL, {
  ok: true,
  data: {
    headers: [{
      name: 'HXWeek ID',
      key: 'hxWeekId'
    }, {
      name: '标题',
      key: 'title1'
    }, {
      name: '标题',
      key: 'title2'
    }, {
      name: '标题',
      key: 'title3'
    }],
    'datas|51-101': [{
      hxWeekId: '123456',
      title1: '内容1',
      title2: '内容2',
      title3: '内容3'
    }]
  }
})