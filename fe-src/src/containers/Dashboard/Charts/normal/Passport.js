import React, { Component } from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.min.css';
import { PageHeader } from 'antd';
import Context from '../../Context';
const testData = [{
  x: '无护照',
  y: 12
}, {
  x: '已预约面签',
  y: 34
}, {
  x: '面签通过',
  y: 8
}, {
  x: '面签未通过',
  y: 6
}, {
  x: '已上传护照',
  y: 54
}, {
  x: '有护照',
  y: 12
}];
class Passport extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Context.Consumer>
        {
          context => {
            return (
              <div className="dashboard-render">
                <PageHeader title="护照信息" />
                <div className="pie-render">
                  <Pie 
                    hasLegend
                    title="总人数"
                    subTitle="总人数"
                    total={() => (
                      <span className="pie-total" dangerouslySetInnerHTML={{
                        __html: testData.reduce((pre, now) => now.y + pre, 0)
                      }} />
                    )}
                    data={ testData }
                    height={ 260 }
                  />
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