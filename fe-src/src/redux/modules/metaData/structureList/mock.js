import * as requests from './requests';
import Mock from 'mockjs';
Mock.setup({
  timeout: 300
})
export const GET_TREE_DATA = Mock.mock(requests.GET_TREE_DATA, {
  ok: true,
  data: {
    headers: [{
      title: '年份123',
      key: '123456'
    },{
      title: '行程信息',
      key: '0-0',
      isParent: true,
      children: [{
        title: '年份',
        key: '0-0-0',
        children: [{
          title: '年份',
          key: '0-0-0-0',
          children: [{
            title: '年份',
            key: '0-0-0-0-0'
          }, {
            title: '年3',
            key: '0-0-0-0-1'
          }]
        }]
      }, {
        title: '项目',
        key: '0-0-1'
      }, {
        title: '行程编号',
        key: '0-0-2',
      }, {
        title: '自购机票出发航班',
        key: '0-0-3'
      }, {
        title: '自购机票交通工具',
        key: '0-0-4'
      }, {
        title: '自购机票航班号',
        key: '0-0-5'
      }, {
        title: '自购机票抵达时间',
        key: '0-0-6'
      }, {
        title: '自购机票跟团接机',
        key: '0-0-7'
      }, {
        title: '自购机票航班号',
        key: '0-0-8'
      }, {
        title: '自购机票自购机票',
        key: '0-0-9'
      }, {
        title: '自购机票跟团送机',
        key: '0-0-10'
      }, {
        title: 'TL分组',
        key: '0-0-11'
      }, {
        title: 'TL',
        key: '0-0-12'
      }, {
        title: '分房信息',
        key: '0-0-13'
      }]
    }, {
      title: '录取信息',
      key: '0-1',
      isParent: true,
      children: [{
        title: '录取状态',
        key: '0-1-0'
      }, {
        title: '录取确认',
        key: '0-1-1'
      }, {
        title: '录取拒绝理由',
        key: '0-1-2'
      }, {
        title: 'WL确认',
        key: '0-1-3'
      }, {
        title: 'WL拒绝理由',
        key: '0-1-4'
      }]
    }, {
      title: '支付信息',
      key: '0-2',
      isParent: true,
      children: [{
        title: '定金状态',
        key: '0-2-0'
      }, {
        title: '定金单号',
        key: '0-2-1'
      }, {
        title: '余款金额',
        key: '0-2-2'
      }, {
        title: '余款状态',
        key: '0-2-3'
      }, {
        title: '余款单号',
        key: '0-2-4'
      }, {
        title: '余款付款方式',
        key: '0-2-5'
      }, {
        title: '收款人姓名',
        key: '0-2-6'
      }, {
        title: '收款人银行账户',
        key: '0-2-7'
      }, {
        title: '收款人银行',
        key: '0-2-8'
      }, {
        title: '收款人开户行',
        key: '0-2-9'
      }]
    }, {
      title: '个人信息',
      key: '0-3',
      isParent: true,
      children: [{
        title: 'HXWeek ID',
        key: '0-3-0'
      }, {
        title: 'HSYLC ID',
        key: '0-3-1'
      }, {
        title: 'HSYLC 学号',
        key: '0-3-2'
      }, {
        title: '姓名',
        key: '0-3-3'
      }, {
        title: '官方中文名',
        key: '0-3-4'
      }, {
        title: '国籍',
        key: '0-3-5'
      }, {
        title: '出生日期',
        key: '0-3-6'
      }, {
        title: '性别',
        key: '0-3-7'
      }]
    }]
  }
})