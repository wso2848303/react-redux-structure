import React, { Component } from "react";
import { Layout } from 'antd';
import Context from './Context';
import './index.less';
const demoSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560763840847&di=6562e18d63483588645fde914a75f304&imgtype=0&src=http%3A%2F%2Fwww.duoqutour.com%2Fhomeimg%2Flunimg%2F1376884871282.jpg';
class Exempition extends Component {
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
                    <a className="info-item link" target="_blank" href={ demoSrc }>免责协议.pdf</a>
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
export default Exempition;