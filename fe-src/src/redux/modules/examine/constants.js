export const TYPES = {
  PASSPORT: 'PASSPORT',
  VISA: 'VISA',
  EVUS: 'EVUS',
  EXEMPITION: 'EXEMPITION',
  HEALTH: 'HEALTH'
}
export const getPageType = (type) => {
  let ret = TYPES.PASSPORT;
  if (type) {
    type = type.toLocaleUpperCase();
    for (let key in TYPES) {
      let item = TYPES[key];
      if (item === type) {
        ret = item;
      }
    }
  }
  return ret;
}
export const getTableHeaders = (type) => {
  let ret = [];
  switch(type) {
    case 'HEALTH': ret = TABLE_HEADERS.HEALTH; break;
    default: ret = TABLE_HEADERS.PASSPORT; break;
  }
  return ret;
}
export const TABLE_HEADERS = {
  HEALTH: [{
    title: 'HXWeek ID',
    key: 'hxWeekId',
    dataIndex: 'hxWeekId'
  }, {
    title: '姓名',
    key: 'name',
    dataIndex: 'name'
  }, {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  }, {
    title: '重点关注',
    key: 'important',
    dataIndex: 'important'
  },{
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    align: 'right'
  }],
  PASSPORT: [{
    title: 'HXWeek ID',
    key: 'hxWeekId',
    dataIndex: 'hxWeekId'
  }, {
    title: '姓名',
    key: 'name',
    dataIndex: 'name'
  }, {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  }, {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    align: 'right'
  }]
}
export const STATUS_STR = {
  0: '未审核',
  1: '通过',
  2: '未通过'
}