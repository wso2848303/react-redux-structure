import React, { Component } from "react";
import { Layout } from 'antd';
import Context from './Context';
import './index.less';
const demoSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560763840847&di=6562e18d63483588645fde914a75f304&imgtype=0&src=http%3A%2F%2Fwww.duoqutour.com%2Fhomeimg%2Flunimg%2F1376884871282.jpg';
class Visa extends Component {
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
                    <div className="info-item">英文姓：</div>
                    <div className="info-item">英文名：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">性别：</div>
                  </div>
                  <div className="info-list">
                    <div className="info-item">Visa Type 签证类型：</div>
                    <div className="info-item">签证有效期：</div>
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
export default Visa;