import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as dashboardActions } from '../../redux/modules/dashboard';
import { Spin } from 'antd';
import Context from './Context';
import Apply from './Charts/normal/Apply';
import Book from './Charts/normal/Book';
import Remain from './Charts/normal/Remain';
import Finish from './Charts/normal/Finish';
import Passport from './Charts/normal/Passport';
import Others from './Charts/normal/Others';
import './index.less';
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Context.Provider value={{
        props: { ...this.props }
      }}>
        { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
        { !this.props.loading &&
          <div className="dashboard-content">
            <div className="dashboard-list">
              <div className="dashboard-item">
                <Apply></Apply>
              </div>
              <div className="dashboard-item">
                <Book></Book>
              </div>
              <div className="dashboard-item">
                <Remain></Remain>
              </div>
              <div className="dashboard-item">
                <Finish></Finish>
              </div>
            </div>
            <div className="dashboard-list">
              <div className="dashboard-item big">
                <Passport></Passport>
              </div>
              <div className="dashboard-item big">
                <Others></Others>
              </div>
            </div>
          </div>
        }
      </Context.Provider>
    )
  }
}
const mapStateToProps = (state, props) => {
  console.log(state);
  return state.dashboard
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(dashboardActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);