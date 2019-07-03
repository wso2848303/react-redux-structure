import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { actions as importActions } from "../../../redux/modules/metaData/import";
import { PageHeader, Layout, Button, Upload, Icon, Table } from 'antd';
import './index.less';
import * as requests from '../../../redux/modules/metaData/import/requests';
class Import extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }
  componentWillMount() {
    if (window.mock) {
      require('../../../redux/modules/metaData/import/mock');
    }
  }
  /**
   * 文件修改事件
   * @param {object} info 上传返回值
   */
  handleChange (info) {
    this.props.importExcel(info.file);
    if (info.file.status === 'done') {
      let data = info.file.response;
      if (data.ok) {
        this.props.setImportResponse(data);
      }
    }
  }
  handleClickCancel () {
    this.props.handleClickCancel();
  }
  /**
   * 文件上传前事件
   * @param {object} file 上传的文件
   * @param {array} fileList 当亲啊上传文件列表
   */
  async beforeUpload(file, fileList) {
    let that = this;
    return await new Promise((resolve, reject) => {
      if (fileList && fileList.length > 1) {
        reject();
      } else {
        resolve(file);
      }
    });
  }
  render() {
    const extraButtons = this.props.import ? [
      <Button key="download">下载导入模板</Button>
    ] : [
      <Button key="cancel" onClick={ this.handleClickCancel }>取消</Button>,
      <Button key="submit" type="primary">确认</Button>
    ]
    const uploadProps = {
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      action: requests.IMPORT_EXCEL,
      // customRequest: this.handleUpload
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      showUploadList: {
        showRemoveIcon: false
      },
      fileList: this.props.fileList
    }
    return(
      <Layout.Content className="app-content">
        { this.props.import &&
          <div className="app-content-render">
            <PageHeader title="数据导入" extra={ extraButtons } />
            <div className="import-render">
              <Upload.Dragger { ...uploadProps }>
                <p className="ant-upload-drag-icon">
                  <Icon type="import" />
                </p>
                <p className="ant-upload-text">点击选择上传文件或拖拽文件到区域上传</p>
                {/* <p className="ant-upload-hint"></p> */}
              </Upload.Dragger>
            </div>
          </div>
        }
        { !this.props.import &&
          <div className="app-content-render">
            <PageHeader title="请确认数据是否正确" extra={ extraButtons } />
            <div className="import-render preview">
              <Table dataSource={ this.props.dataSource } columns={ this.props.headers }></Table>
            </div>
          </div>
        }
      </Layout.Content>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.metaData.importReducer;
}
const mapActionCreators = dispatch => {
  return {
    ...bindActionCreators(importActions, dispatch)
  }
}
export default connect(mapStateToProps, mapActionCreators)(Import);