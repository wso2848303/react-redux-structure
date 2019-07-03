import * as requests from './requests';
import Mock from 'mockjs';
Mock.setup({
  timeout: 300
})
export const GET_SIDER_DATA = Mock.mock(requests.GET_SIDER_DATA, {
  ok: true,
  data: {
    defaultSelected: ['DASHBOARD_ENROL'],
    defaultOpened: ['DASHBOARD'],
    siders: [{
      name: 'Dashboard',
      key: 'DASHBOARD',
      icon: 'dashboard',
      subs: [{
        name: '招生阶段',
        key: 'DASHBOARD_ENROL',
        href: '/dashboard'
      }, {
        name: '运营阶段',
        key: 'DASHBOARD_OPERATE',
        href: '/dashboard'
      }]
    }, {
      name: '元数据',
      key: 'METADATA',
      icon: 'database',
      subs: [{
        name: '数据结构',
        key: 'METADATA_STRUCTURE',
        href: '/meta/view'
      }, {
        name: '数据导入',
        key: 'METADATA_IMPORT',
        href: '/meta/import'
      }]
    }, {
      name: '数据查看',
      key: 'DATAVIEW',
      icon: 'table',
      subs: [{
        name: '新建表格',
        key: 'DATAVIEW_CREATE',
        href: '/table/create'
      }, {
        name: '表格名1',
        key: 'DATAVIEW_1',
        href: `/table/view/${ 1 }`
      }, {
        name: '表格名2',
        key: 'DATAVIEW_2',
        href: `/table/view/${ 2 }`
      }, {
        name: '表格名3',
        key: 'DATAVIEW_3',
        href: `/table/view/${ 3 }`
      }]
    }, {
      name: '审核',
      key: 'EXAMINE',
      icon: 'audit',
      subs: [{
        name: '护照',
        key: 'EXAMINE_PASSPORT',
        href: '/examine/list/passport'
      }, {
        name: 'evus',
        key: 'EXAMINE_EVUS',
        href: '/examine/list/evus'
      }, {
        name: '签证页',
        key: 'EXAMINE_VISA',
        href: '/examine/list/visa'
      }, {
        name: '免责协议',
        key: 'EXAMINE_EXEMPITION',
        href: '/examine/list/exempition'
      }, {
        name: '健康信息',
        key: 'EXAMINE_HEALTH',
        href: '/examine/list/health'
      }]
    }, {
      name: '下载',
      key: 'DOWNLOAD',
      icon: 'download',
      subs: [{
        name: '英文简历',
        key: 'DOWNLOAD_RESUME_EN',
        href: '/download/resume/en'
      }]
    }]
  }
})