import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as tableViewActions } from "../../../redux/modules/table/view";
import { Layout, PageHeader, Button, Spin, Table, Input, Icon } from 'antd';
import clone from 'clone';
import './index.less';
const EDIT_TYPE = {
  NONE: 'NONE',
  TRIGGER: 'trigger',
  BUTTON: 'button'
}
const Content = React.createContext();
class TableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  /**
   * 切换单元格编辑状态
   * @param {function} cb 回调事件
   * @param {string} editingKey 单元格编辑key
   */
  toggleEdit(cb, editingKey) {
    let editing = !this.state.editing;
    if (editing && editingKey !== '') {
      editing = !editing;
    }
    this.setState({
      editing: editing
    }, () => {
      if (editing) {
        this.input.focus();
        cb(true);
      } else {
        cb(false);
      }
    });
  }
  render() {
    return (
      <Content.Consumer>
        {
          content => {
            let cell;
            if (this.props.link) {
              cell = <td><Link to={ `/table/detail/${ this.props.datas[this.props.cellKey] }` }>{ this.props.children }</Link></td>
            } else if (this.props.isOperation || this.props.editType === EDIT_TYPE.NONE) {
              cell = <td>{ this.props.children }</td>
            } else if (this.props.editType === EDIT_TYPE.BUTTON) {
              if (content.rowEditing) {
                cell = <td><Input defaultValue={ this.props.datas[this.props.cellKey] } /></td>
              } else {
                cell = <td>{ this.props.children }</td>
              }
            } else {
              if (this.state.editing) {
                cell = <td>
                  <Input 
                    ref={ node => (this.input = node) } 
                    defaultValue={ this.props.datas[this.props.cellKey] } 
                    onPressEnter={ () => this.toggleEdit(content.content.setTriggerEditing) }
                    onBlur={ () => this.toggleEdit(content.content.setTriggerEditing) }
                  />
                </td>
              } else {
                cell = <td>
                <div onClick={ () => this.toggleEdit(content.content.setTriggerEditing, content.content.editingKey) } className="edit-cell">
                  { this.props.children }
                </div>
              </td>
              }
            }
            return (
              cell
            )
          }
        }  
      </Content.Consumer>
    )
  }
}
class TableRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Content.Consumer>
        {
          content => {
            return (
              <Content.Provider value={{ 
                rowEditing: this.props['data-row-key'] === content.editingKey,
                content: content
              }}>
                <tr { ...this.props }/>
              </Content.Provider>
            )
          }
        }
      </Content.Consumer>
    )
  }
}
class TableView extends Component {
  constructor(props) {
    super(props);
    this.setRowEditing = this.setRowEditing.bind(this);
    this.getColumnProps = this.getColumnProps.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * 切换单元行编辑状态
   * @param {string} key row key
   */
  setRowEditing(key) {
    this.props.setEditingKey(key);
  }
  async componentWillMount () {
    this.id = this.props.match.params.id;
    await this.props.getTableData();
  }
  async componentDidUpdate () {
    let id = this.props.match.params.id;
    if (id !== this.id) {
      this.id = id;
      await this.props.getTableData();
    }
  }
  /**
   * 筛选事件
   * @param {int} pagination
   * @param {array} filters 
   * @param {object} sorter 
   */
  handleChange (pagination, filters, sorter) {
    for (let key in filters) {
      let filteredValue = clone(this.props.filteredValue);
      filteredValue[key] = filters[key];
      this.props.setFilteredValue(filteredValue);
    }
  }
  /**
   * 获取筛选表头参数
   * @param {object} col 表头信息
   */
  getFilterColumnProps (col) {
    let ret = {}, filters = [], _filters = {};
    let globalFilters = clone(this.props.filters);
    this.props.tableData.forEach(item => {
      if (!_filters[item[col.key]]) {
        _filters[item[col.key]] = clone(item[col.key]);
      }
    });
    for (let key in _filters) {
      filters.push({
        text: key,
        value: _filters[key]
      });
    }
    globalFilters[col.key] = filters;
    ret.filters = globalFilters[col.key];
    ret.onFilter = (value, record) => record[col.key] === value;
    ret.filteredValue = this.props.filteredValue[col.key];
    ret.filterMultiple = true;
    return ret;
  }
  /**
   * 搜索事件
   * @param {array} selectedKeys 
   * @param {function} confirm 
   * @param {object} col 
   */
  handleSearch (selectedKeys, confirm, col) {
    confirm();
    let searchText = clone(this.props.searchText);
    searchText[col.key] = selectedKeys[0];
    this.props.setSearchText(searchText);
  }
  /**
   * 取消搜索
   * @param {function} clearFilters 
   * @param {object} col 
   */
  handleReset (clearFilters, col) {
    clearFilters();
    let searchText = clone(this.props.searchText);
    searchText[col.key] = '';
    this.props.setSearchText(searchText);
  }
  /**
   * 获取搜索表头参数
   * @param {object} col 
   */
  getSearchColumnProps (col) {
    let ret = {};
    ret.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input 
            placeholder={ `Search ${ col.title }` }
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={ () => this.handleSearch(selectedKeys, confirm, col) }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, col)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters, col)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      )
    }
    ret.filterIcon = filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    )
    ret.onFilter = (value, record) => record[col.key].toString().toLocaleLowerCase().includes(value.toLocaleLowerCase());
    return ret;
  }
  /**
   * 获取表头参数
   * @param {object} col 
   */
  getColumnProps (col) {
    let ret = {};
    if (col.sort) {
      let key = col.key;
      ret.sorter = (a, b) => a[key] - b[key];
    }
    if (col.filter === 'filter') {
      ret = Object.assign({}, ret, this.getFilterColumnProps(col));
    }
    if (col.filter === 'search') {
      ret = Object.assign({}, ret, this.getSearchColumnProps(col));
    }
    return ret;
  }
  render() {
    const extraButtons = [
      <Link key="edit" to={ `/table/create/${ this.id }` }><Button>编辑</Button></Link>,
      <Button type="primary" key="output">导出</Button>
    ];
    let columns = clone(this.props.headers);
    columns.push({
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 130,
      align: 'center',
      render: (row) => {
        return (
          <div className="operation-list">
            { this.props.editingKey === row.key ? 
              [<Button type="link" onClick={ () => this.setRowEditing('') } key="cancel">取消</Button>, <Button type="link" key="save">保存</Button>]:
              <Button type="link" disabled={ this.props.isTriggerEditing || this.props.editingKey !== '' } onClick={ () => this.setRowEditing(row.key) }>编辑</Button>
            }
          </div>
        )
      }
    })
    columns = columns.map(col => {
      return {
        ...col,
        onCell: cell => {
          return {
            isOperation: col.key === 'operation',
            editType: col.editType || EDIT_TYPE.NONE,
            datas: cell,
            cellKey: col.key,
            link: !!col.link
          }
        },
        ...this.getColumnProps(col)
      }
    });
    return (
      <Content.Provider value={ this.props }>
        <Layout.Content className="app-content">
          { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
          { !this.props.loading &&
            <div className="app-content-render table-render">
              <PageHeader title={ this.props.tableName } extra={ extraButtons } className="header" />
              <div className="table-content-render">
                <Table 
                  scroll={{ x: 2000 }} 
                  columns={ columns } 
                  dataSource={ this.props.tableData } 
                  rowClassName={() => 'edit-row'}
                  components={{
                    body: {
                      row: TableRow,
                      cell: TableCell
                    }
                  }}
                  onChange={ this.handleChange }
                />
              </div>
            </div>
          }
        </Layout.Content>
      </Content.Provider>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.table.view
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(tableViewActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableView);