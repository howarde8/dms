import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Spin } from "antd";
import { getUserMe, updateUserMe } from "../actions/userAction";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserMe();
  }

  onSave = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateUserMe(values);
      }
    });
  };

  renderMeForm = () => {
    if (!this.props.user.me) {
      return <Spin />;
    }
    const { getFieldDecorator } = this.props.form;
    const { username, name, email } = this.props.user.me;
    return (
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.onSave}
        style={{ maxWidth: "500px" }}
      >
        <Form.Item label="Username">
          {getFieldDecorator("username", {
            initialValue: username
          })(<Input type="username" disabled />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input name" }],
            initialValue: name
          })(<Input type="name" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            initialValue: email
          })(<Input type="email" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  render() {
    return this.renderMeForm();
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  getUserMe,
  updateUserMe
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Profile));
