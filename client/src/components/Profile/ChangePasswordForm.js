import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateUserMePassword } from "../../actions/userAction";

class ChangePasswordForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateUserMePassword(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue("newPassword")) {
      callback("Two passwords are inconsistent");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmit={this.onSubmit}
        style={{ maxWidth: "550px" }}
      >
        <Form.Item label="Current Password">
          {getFieldDecorator("currentPassword", {
            rules: [
              { required: true, message: "Please input current password" }
            ]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="New Password">
          {getFieldDecorator("newPassword", {
            rules: [{ required: true, message: "Please input new password" }]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="Confirm New Password">
          {getFieldDecorator("confirmNewPassword", {
            rules: [
              { required: true, message: "Please confirm new password" },
              { validator: this.compareToFirstPassword }
            ]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 8, align: "left" }}>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  updateUserMePassword
};

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(ChangePasswordForm));
