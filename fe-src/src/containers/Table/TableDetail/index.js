import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as tableDetailActions } from "../../../redux/modules/table/tableDetail";
import { Layout, PageHeader, Button, Input, Spin } from 'antd';
import './index.less';
class TableDetail extends Component {
  constructor(props) {
    super(props);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }
  /**
   * 切换编辑状态
   */
  handleClickEdit () {
    this.props.triggleEdit();
  }
  async componentWillMount () {
    await this.props.getTableDetail();
  }
  render () {
    const extraButtons = this.props.edit ? [
      <Button key="cancel" onClick={ this.handleClickEdit }>取消</Button>,
      <Button key="submit" type="primary">确认</Button>
    ]: [
      <Button key="edit" type="primary" onClick={ this.handleClickEdit }>编辑</Button>
    ]
    return (
      <Layout.Content className="table-detail">
        { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
        { !this.props.loading &&
          <div>
            <PageHeader 
              title={ this.props.detail.tableName } 
              onBack={() => this.props.history.goBack()} 
              extra={ extraButtons }
            />
            <Layout className="type-render">
              { this.props.detail.types && this.props.detail.types.map((item, index) => (
                <div key={ index } className="type-item">
                  <div className="type-title">{ item.typeName }</div>
                  <div className="type-content-list">
                    { item.details && item.details.map((detail, detailIndex) => (
                      <div className="type-content-item" key={ detailIndex }>
                        <div className="item-name">{ detail.name }:</div>
                        { !this.props.edit &&
                          <div className="item-value">{ detail.value }</div>
                        }
                        {
                          this.props.edit &&
                          <div className="item-value">
                            <Input className="item-inp" defaultValue={ detail.value }></Input>
                          </div>
                        }
                      </div>
                    )) }
                  </div>
                </div>
              )) }
            </Layout>
          </div>
        }
      </Layout.Content>
    );
  }
}
const mapStateToProps = (state, props) => {
  return state.table.detail
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(tableDetailActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDetail);