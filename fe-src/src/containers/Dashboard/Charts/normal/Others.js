import React, { Component } from 'react';
import { Pie } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.min.css';
import Context from '../../Context';
import { PageHeader } from 'antd';
class Others extends Component {
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
                <PageHeader title="其他资料" />
                <div className="pie-list">
                  <div className="pie-item">
                    <Pie 
                      percent={ 28 } 
                      subTitle="发展问卷" 
                      height={ 146 } 
                      color={ ['#1890FF'] }
                      total={() => (
                        <span className="pie-percent">28%</span>
                      )}
                    />
                  </div>
                  <div className="pie-item">
                    <Pie 
                      percent={ 22 } 
                      subTitle="健康调查" 
                      height= { 146 } 
                      color={ ['#2FC25B'] }
                      total={() => (
                        <span className="pie-percent">22%</span>
                      )}
                    />
                  </div>
                  <div className="pie-item">
                    <Pie 
                      percent={ 22 } 
                      subTitle="简历" 
                      height= { 146 } 
                      color={ ['#7958FF'] }
                      total={() => (
                        <span className="pie-percent">22%</span>
                      )}
                    />
                  </div>
                  <div className="pie-item">
                    <Pie 
                      percent={ 22 } 
                      subTitle="选课" 
                      height= { 146 } 
                      color={ ['#FAD337'] }
                      total={() => (
                        <span className="pie-percent">22%</span>
                      )}
                    />
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
export default Others;