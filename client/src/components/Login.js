import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Spin, Typography, Row, Col } from "antd";
import { connect } from "react-redux";
import { fetchUser, login } from "../actions/authAction";

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
          <Row>
            <Col span={9} />
            <Col span={6}>
              <Form
                onSubmit={this.handleSubmit}
                style={{ maxWidth: "300px", marginTop: "100px" }}
              >
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                  DMS
                </Typography.Title>
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input username" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input password" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
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
            </Col>
            <Col span={9} />
          </Row>
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
