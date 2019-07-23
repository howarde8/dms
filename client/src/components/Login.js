import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { fetchUser, login } from "../actions";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
      }
    });
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    switch (this.props.auth.user) {
      case undefined:
      case null:
        return <Spin />;
      case false:
        return (
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Please input username" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input password" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        );
      default:
        return <Redirect to="/" />;
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = {
  fetchUser,
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
