import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as loginActions } from "../../redux/modules/login";
import { Layout } from 'antd'; 
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.test = this.test.bind(this);
  }
  test () {
    this.props.history.push('/table/create/123')
  }
  render () {
    return (
      <Layout.Content className="app-content">
        <div className="app-content-render">
          <input onChange={ this.handleChangeText } type="text" defaultValue={this.props.text} />
          <div>{ this.props.text }</div>
          <div onClick={ this.test }>asdasd</div>
        </div>
      </Layout.Content>
    );
  }
  handleChangeText (text) {
    this.props.setText(text.currentTarget.value);
  }
}
const mapStateToProps = (state, props) => {
  return state.login
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);