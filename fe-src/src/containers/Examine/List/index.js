import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as examineListActions } from '../../../redux/modules/examine/list';
import { Layout, PageHeader, Spin, Table } from 'antd';
import { TYPES, getPageType, getTableHeaders, STATUS_STR } from '../../../redux/modules/examine/constants';
import { Link } from 'react-router-dom';
import clone from 'clone';
import './index.less';
class TableCell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cell;
    if (this.props.col.key === 'operation') {
      cell = <td className="cell-right"><Link to={ `/examine/detail/${ this.props.cell.hxWeekId }` }>审核</Link></td>
    } else if (this.props.col.key === 'status') {
      let statusStr = STATUS_STR[this.props.cell.status];
      let className = `i-status i-status-${ this.props.cell.status }`;
      cell = <td>
        <i className={ className }></i><span>{ statusStr }</span>
      </td>
    } else if (this.props.col.key === 'important') {
      cell = <td>{ this.props.cell.important ? '是' : '' }</td>
    } else {
      cell = <td>{ this.props.children }</td>
    }
    return cell
  }
}
class ExaminList extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * 设置当前页面状态
   */
  setPageTitle () {
    let pageTitle;
    switch(this.pageType) {
      case TYPES.PASSPORT: pageTitle = '护照信息审核'; break;
      case TYPES.VISA: pageTitle = '签证页审核'; break;
      case TYPES.EVUS: pageTitle = 'evus审核'; break;
      case TYPES.EXEMPITION: pageTitle = '免责协议审核'; break;
      case TYPES.HEALTH: pageTitle = '健康信息审核'; break;
    }
    this.pageTitle = pageTitle;
  }
  async componentWillMount () {
    this.pageType = getPageType(this.props.match.params.type);
    this.props.setPageType(this.pageType);
    this.props.getExamineList(this.pageType);
    this.setPageTitle();
  }
  async componentDidUpdate () {
    let pageType = getPageType(this.props.match.params.type);
    if (pageType !== this.pageType) {
      this.pageType = pageType;
      this.props.setPageType(this.pageType);
      this.props.getExamineList(this.pageType);
      this.setPageTitle();
    }
  }
  render() {
    let columns = getTableHeaders(this.pageType);
    columns = columns.map(col => {
      return {
        ...col,
        onCell: cell => {
          return {
            cell: { ...cell },
            col: {...col}
          }
        }
      }
    })
    return (
      <Layout.Content className="app-content">
        <div className="app-content-render table-render">
          <PageHeader title={ this.pageTitle } className="header" />
            { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
            { !this.props.loading && 
              <div className="table-content-render">
                <Table 
                  columns={ columns } 
                  dataSource={ this.props.tableData } 
                  components={{
                    body: {
                      cell: TableCell
                    }
                  }}
                />
              </div>   
            }
        </div>
      </Layout.Content>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.examine.list
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(examineListActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExaminList);