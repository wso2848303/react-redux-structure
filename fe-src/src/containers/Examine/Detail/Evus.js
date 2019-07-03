import React, { Component } from "react";
import { Layout } from 'antd';
import Context from './Context';
import './index.less';
const demoSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560764031619&di=5e7c61995e6b9505a907d536ffecc4a8&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170327%2F25750ea68c1d4d74b761e5759ecf62c5_th.jpeg';
class Evus extends Component {
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
                  </div>
                  <div className="info-list">
                    <div className="info-item">英文姓：</div>
                    <div className="info-item">英文名：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">护照号：</div>
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
export default Evus;