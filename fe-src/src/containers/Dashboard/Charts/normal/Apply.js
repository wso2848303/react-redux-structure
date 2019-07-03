import React, { Component } from 'react';
import { MiniProgress, ChartCard } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.min.css';
import { Icon, Tooltip } from 'antd';
import Context from '../../Context';
class Apply extends Component {
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
                <ChartCard 
                  title="完成申请"
                  action={
                    <Tooltip title="指标说明">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="156"
                  contentHeight={ 46 }
                  footer={
                    <div>目标 200</div>
                  }
                >
                  <MiniProgress percent={78} strokeWidth={8} target={80} />
                </ChartCard>
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}
export default Apply;