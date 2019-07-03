import React, { Component } from 'react';
import { ChartCard } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.min.css';
import { Icon, Tooltip } from 'antd';
import Context from '../../Context';
class Remain extends Component {
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
                  title="余额支付"
                  action={
                    <Tooltip title="指标说明">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="99"
                  contentHeight={ 46 }
                  footer={
                    <div>转化率 82%</div>
                  }
                >
                  今日新增 12
                </ChartCard>
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}
export default Remain;