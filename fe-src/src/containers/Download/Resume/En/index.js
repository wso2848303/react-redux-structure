import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as resumeActions } from '../../../../redux/modules/download/resume';
import { Layout, PageHeader, Spin, DatePicker, Table } from 'antd';
import Context from './Context';
import { TABLE_HEADERS } from '../../../../redux/modules/download/resume/constants';
import '../index.less';
class ResumeEn extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount () {
    await this.props.getResumeRecordsEn();
  }
  render() {
    return (
      <Context.Provider value={{
        props: { ...this.props }
      }}>
        <Layout.Content className="download-header">
          <div className="download-content">
            <PageHeader title="英文简历下载" />
            <Layout className="content-render">
              <div className="date-search-bar">
                <DatePicker className="date-search-render" placeholder="开始日期"></DatePicker>
                <DatePicker className="date-search-render" placeholder="结束日期"></DatePicker>
              </div>
            </Layout>
          </div>
          <div className="download-content">
            <PageHeader title="下载记录" />
            <Layout className="content-render table-render">
              { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
              { !this.props.loading &&
                <div>
                  <Table 
                    columns={ TABLE_HEADERS }
                    dataSource={ this.props.datas }
                  />
                </div>
              }
            </Layout>
          </div>
        </Layout.Content>
      </Context.Provider>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.download.resume
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(resumeActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResumeEn);