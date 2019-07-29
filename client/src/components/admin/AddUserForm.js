import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Icon } from "antd";
import { addUser } from "../../actions";

class AddUserFrom extends Component {
  onAddUser = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUser({
          username: values.username,
          password: values.password,
          name: values.name
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onAddUser}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input username" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input password" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input name" }]
          })(
            <Input
              prefix={
                <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="name"
              placeholder="Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add user
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  addUser
};

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(AddUserFrom));
