import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as createTableActions } from "../../../redux/modules/table/createTable";
import { PageHeader, Form, Input, Tree, Button, Row, Col, Layout, Spin } from 'antd';
import Sortable from 'react-sortablejs';
import './index.less';
const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  }
}
const EditForm = Form.create({
  name: 'EDIT_TABLE_FORM',
  /**
   * fields 变化时触发
   * @param {object} props 组件参数
   * @param {object} changeFields 事件对象
   */
  onFieldsChange(props, changeFields) {
    props.onChange(changeFields);
  },
  mapPropsToFields(props) {
    return {
      tableName: Form.createFormField({
        ...props.tableName,
        value: props.tableName.value
      }),
      checked: Form.createFormField({
        ...props.checked,
        value: props.checked.value
      }),
      sort: Form.createFormField({
        ...props.sort,
        value: props.sort.value
      })
    }
  },
  /**
   * 数据改变后触发
   * @param {object} props 组件参数
   * @param {object} values 改变的数据
   */
  onValuesChange(props, values) {
  }
})((props) => {
  const { getFieldDecorator } = props.form;
  const { TreeNode } = Tree;
  const renderTreeNode = data => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode 
            { ...item }
            dataRef={ item }
            checkable={ false }
          >
            { renderTreeNode(item.children) }
          </TreeNode>
        )
      }
      else return <TreeNode { ...item } dataRef={ item } />
    })
  };
  const renderSortItem = data => {
    return data.map(item => (
      <li className="sort-item" key={ item.key } data-id={ item.key }>{ item.title }</li>
    ));
  }
  return (
    props.loading ? <Spin className="route-spin" size="large"></Spin> :
      <Form {...FORM_ITEM_LAYOUT}>
        <Form.Item label="表格名称">
          {getFieldDecorator('tableName')(<Input />)}
        </Form.Item>
        <Form.Item label="字段选择">
          <Tree autoExpandParent onCheck={ props.onCheckTree } checkedKeys={ props.checked.value } checkable>
            { renderTreeNode(props.treeData) }
          </Tree>
        </Form.Item>
        <Form.Item label="字段排序" wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}>
          <Sortable onChange={ props.onSort } className="sort-render">
            { renderSortItem(props.sort.value) }
          </Sortable>
          <p className="tip">请直接拖动字段位置排序</p>
        </Form.Item>
        <Row>
          <Col span={ 8 } push={ 4 }>
          { props.create
          ? <div className="submit-render">
            <Button type="primary" htmlType="submit">新建</Button>
          </div>
          : <div className="submit-render">
            <Button type="primary" htmlType="submit">修改</Button>
            <Button>取消</Button>
            <Button type="danger">删除</Button>
          </div> }
          </Col>
        </Row>
      </Form>
  )
});
class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckTree = this.handleCheckTree.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  /**
   * 填写数据变化
   * @param {array} fields 填写数据
   */
  handleChange (fields) {
    this.props.editFields(fields);
  }
  /**
   * 勾选事件
   * @param {array} checkedKeys 勾选的树
   * @param {object} e 事件对象
   */
  handleCheckTree (checkedKeys, e) {
    this.props.checkTree(checkedKeys, e);
  }
  /**
   * 排序事件
   * @param {object} order 排序对象
   */
  handleSort (order) {
    this.props.changeSort(order);
  }
  async componentWillMount () {
    this.create = !this.props.match.params.id;
    await this.props.getTreeData();
  }
  async componentDidUpdate () {
    let create = !this.props.match.params.id;
    if (create !== this.create) {
      this.create = create;
      await this.props.getTreeData();
    }
  }
  render () {
    return (
      <Layout.Content className="app-content">
        <div className="app-content-render">
          <div className="edit-table-page">
            <PageHeader title="编辑表格" />
            <div className="form-render">
              <EditForm 
                { ...this.props.fields } 
                treeData={ this.props.headers }
                onChange={ this.handleChange}  
                onCheckTree={ this.handleCheckTree }
                onSort={ this.handleSort }
                create={ this.create }
                loading={ this.props.loading }
              />
            </div>
          </div>
        </div>
      </Layout.Content>
    );
  }
}
const mapStateToProps = (state, props) => {
  return state.table.create;
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(createTableActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTable);