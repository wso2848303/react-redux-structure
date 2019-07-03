import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as appActions } from "../../redux/modules/app";
import { Layout, Menu, Icon, Avatar, Spin } from 'antd';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const Login = React.lazy(() => import('../Login'));
const CreateTable = React.lazy(() => import('../Table/CreateTable'));
const TableDetail = React.lazy(() => import('../Table/TableDetail'));
const MetaView = React.lazy(() => import('../MetaData/StructureList'));
const Import = React.lazy(() => import('../MetaData/Import'));
const TableView = React.lazy(() => import('../Table/View'));
const ExamineList = React.lazy(() => import('../Examine/List'));
const ExamineDetail = React.lazy(() => import('../Examine/Detail'));
const DownLoadResumeEn = React.lazy(() => import('../Download/Resume/En'));
const Dashboard = React.lazy(() => import('../Dashboard'));
class App extends Component {
  constructor (props) {
    super(props);
    this.triggerSlide = this.triggerSlide.bind(this);
  }
  triggerSlide () {
    this.props.triggerSlide();
  }
  async componentWillMount () {
    await this.props.getSideData();
  }
  render() {
    return (
      <div>
        { !this.props.state.app.loading &&
        <Router>
          <Layout className="app-layout">
            <Sider collapsible collapsed={ this.props.state.app.collapsed } onCollapse={ this.triggerSlide }>
              <div className="logo" />
              <Menu theme="dark" defaultOpenKeys={ this.props.state.app.sideData.defaultOpened } defaultSelectedKeys={
                this.props.state.app.sideData.defaultSelected } mode="inline">
                { this.props.state.app.sideData.siders.map(slide => (
                <SubMenu key={ slide.key } title={ 
                    <span>
                      <Icon type={ slide.icon } />
                      <span>{ slide.name }</span>
                    </span>
                  }>
                  { slide.subs.map(sub => (
                    <Menu.Item key={ sub.key }>
                      <Link to={{
                        pathname: sub.href
                      }}>{ sub.name }</Link>
                    </Menu.Item>
                  )) }
                </SubMenu>
                )) }
              </Menu>
            </Sider>
            <Layout>
              <Header className="app-header">
                <Avatar icon="user" />
                <label className="user-name">用户名</label>
              </Header>
              {/* 路由配置 */}
              <Suspense fallback={ <Spin className="route-spin" size="large">
                </Spin> }>
                <Switch>
                  <Route path='/login' component={ Login } />
                  <Route path={'/table/view/:id?'} component={ TableView } />
                  <Route path={'/table/create/:id?'} component={ CreateTable } />
                  <Route path={'/table/detail/:id?'} component={ TableDetail } />
                  <Route path={'/meta/view'} component={ MetaView } />
                  <Route path={'/meta/import'} component={ Import } />
                  <Route path={'/examine/list/:type'} component={ ExamineList } />
                  <Route path={'/examine/detail/:id'} component={ ExamineDetail } />
                  <Route path={'/download/resume/en'} component={ DownLoadResumeEn } />
                  <Route path={'/dashboard'} component={ Dashboard } />
                </Switch>
              </Suspense>
            </Layout>
          </Layout>
        </Router>
        }
        { this.props.state.app.loading && 
          <Spin size="large" className="spin-large" />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    state: state,
    props: props
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
