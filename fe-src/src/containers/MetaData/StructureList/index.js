import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { actions as structureListActions } from "../../../redux/modules/metaData/structureList";
import { PageHeader, Tree, Layout, Spin, Input } from 'antd';
import './index.less';
class StructureList extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  async componentWillMount () {
    await this.props.getTreeData();
  }
  /**
   * 搜索事件
   * @param {string} value 搜索字符串
   */
  handleSearch (value) {
    this.props.onSearch(value);
  }
  render() {
    const { TreeNode } = Tree;
    const renderTreeNode = data => {
      return data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode 
              { ...item }
            >
              { renderTreeNode(item.children) }
            </TreeNode>
          )
        }
        else return <TreeNode { ...item } dataRef={ item } />
      })
    };
    return(
      <Layout.Content className="app-content">
        <div className="app-content-render">
          <PageHeader title="数据结构" />
          <div className="meta-structure-render">
            <div className="search-render">
              <Input.Search placeholder="搜索" onSearch={ this.handleSearch } />
            </div>
            <div className="tree-render">
              <Tree>
                { renderTreeNode(this.props.showHeaders) }
              </Tree>
            </div>
          </div>
        </div>
      </Layout.Content>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.metaData.structureList;
}
const mapActionCreators = dispatch => {
  return {
    ...bindActionCreators(structureListActions, dispatch)
  }
}
export default connect(mapStateToProps, mapActionCreators)(StructureList);