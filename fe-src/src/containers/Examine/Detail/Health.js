import React, { Component } from "react";
import { Layout } from 'antd';
import Context from './Context';
import './index.less';
class Health extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Context.Consumer>
        {
          content => {
            return (
              <div>
                <div className="detail-title">HXWeek ID: 123456</div>
                <div className="info-render">
                  <div className="info-list">
                    <div className="info-item">学生姓名：</div>
                    <div className="info-item">行程：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">家长联系方式：</div>
                    <div className="info-item">学生联系方式：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item max">学生在参加项目期间是否需要使用特殊药物：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item max">学生病史：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item max">饮食禁忌：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item max">特殊情况：</div>
                  </div>
                </div>
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}
export default Health;