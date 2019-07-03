import React, { Component } from "react";
import { Layout } from 'antd';
import Context from './Context';
import './index.less';
const demoSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560518247569&di=8759c23c10b5fa075d799a8f83995beb&imgtype=0&src=http%3A%2F%2Fimg4.cache.netease.com%2Fsports%2F2011%2F7%2F10%2F201107100526355cddb.jpg';
class Passport extends Component {
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
                    <div className="info-item">护照号：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">中文姓名：</div>
                    <div className="info-item">英文姓：</div>
                    <div className="info-item">英文名：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">性别：</div>
                    <div className="info-item">出生日期：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">护照签发国家／地区：</div>
                    <div className="info-item">护照有效期至：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">家长联系方式：</div>
                    <div className="info-item">学生联系方式：</div>
                  </div>
                  <div className="img-render">
                    <img src={ demoSrc } />
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
export default Passport;