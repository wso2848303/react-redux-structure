import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as examineDetailActions } from '../../../redux/modules/examine/detail';
import { Layout, PageHeader, Spin, Radio, Input, Button, Checkbox } from 'antd';
import { TYPES } from '../../../redux/modules/examine/constants';
import Context from './Context';
import Passport from './Passport';
import Evus from './Evus';
import Visa from './Visa';
import Exempition from './Exempition';
import Health from './Health';
import './index.less';
class ExamineDetail extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    this.id = this.props.match.params.id;
    await this.props.getExamineDetail(this.id);
  }
  async componentDidUpdate() {
    let id = this.props.match.params.id;
    if (id !== this.id) {
      this.id = id;
      await this.props.getExamineDetail(this.id);
    }
  }
  render() {
    let Detail;
    switch(this.props.pageType) {
      case TYPES.PASSPORT: Detail = <Passport></Passport>; break;
      case TYPES.VISA: Detail = <Visa></Visa>; break;
      case TYPES.EVUS: Detail = <Evus></Evus>; break;
      case TYPES.EXEMPITION: Detail = <Exempition></Exempition>; break;
      case TYPES.HEALTH: Detail = <Health></Health>; break;
    }
    return (
      <Context.Provider value={{ 
        props: { ...this.props }
       }}>
        <Layout.Content className="examine-detail">
          { this.props.loading && <Spin className="route-spin" size="large"></Spin> }
          { !this.props.loading && 
            <div>
              <PageHeader 
                onBack={() => this.props.history.goBack()} 
              />
              <Layout className="detail-render">
                { Detail }
                <div className="result-render">
                  <div className="result-name">审核结果</div>
                  <Radio.Group defaultValue={ this.props.qualify } size="large" buttonStyle="solid" className="radio-render">
                    <Radio.Button value={ true } className="radio-item">通过</Radio.Button>
                    <Radio.Button value={ false } className="radio-item">不通过</Radio.Button>
                  </Radio.Group>
                  { this.props.pageType === TYPES.HEALTH &&
                    <div className="checkbox-render">
                      <Checkbox>重点关注</Checkbox>
                    </div>
                  }
                </div>
                <div className="result-render">
                  <div className="result-name">笔记</div>
                  <Input.TextArea className="text-area-render" defaultValue={ this.props.note } />
                </div>
                <Button className="btn-render" size="large" type="primary">下一个</Button>
              </Layout>
            </div>
          }       
        </Layout.Content>
      </Context.Provider>
    )
  }
}
const mapStateToProps = (state, props) => {
  return state.examine.detail
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(examineDetailActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamineDetail);