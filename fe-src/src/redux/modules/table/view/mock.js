import Mock, { Random } from 'mockjs';
import * as requests from './requests';
Mock.setup({
  timeout: 300
});
Mock.mock(requests.GET_TABLE_DATA, {
  ok: true,
  data: {
    tableName: '测试表格',
    headers: [{
      name: 'HXWeek ID',
      key: 'hxWeekId',
      link: true,
      sort: true
    }, {
      name: '标题',
      key: 'title1',
      editType: 'button',
      filter: 'filter',
      sort: true
    }, {
      name: '标题',
      key: 'title2',
      editType: 'trigger',
      filter: 'filter',
      sort: true
    }, {
      name: '标题',
      key: 'title3',
      editType: 'trigger',
      filter: 'search'
    }, {
      name: '标题',
      key: 'title4',
      editType: 'button',
      filter: 'search'
    }, {
      name: '标题',
      key: 'title5'
    }, {
      name: '标题',
      key: 'title6'
    }, {
      name: '标题',
      key: 'title7'
    }, {
      name: '标题',
      key: 'title8'
    }, {
      name: '标题',
      key: 'title9'
    }, {
      name: '标题',
      key: 'title10'
    }],
    'datas|5': [{
      'hxWeekId|+1': 1,
      'title1|+1': 1,
      'title2|+1': 2,
      'title3|+1': 3,
      'title4|+1': 4,
      'title5|+1': 5,
      'title6|+1': 6,
      'title7|+1': 7,
      'title8|+1': 8,
      'title9|+1': 9,
      'title10|+1': 10
    }]
  }
})