import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Icon, Modal } from "antd";
import { closeEditForm, updateUser } from "../../actions";

class AddUserFrom extends Component {
  onEditSave = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateUser({...values, index: this.props.user.editingUser.index});
      }
    });
    this.props.closeEditForm();
  };

  onEditCancel = () => {
    this.props.closeEditForm();
  };

  render() {
    if (!this.props.user.isEditing) {
      // Prevent initialValue only shows 1 time
      this.props.form.resetFields();
    }
    const { getFieldDecorator } = this.props.form;
    const {index, username, name, level} = this.props.user.editingUser ? this.props.user.editingUser : {};
    return (
      <Modal
        visible={this.props.user.isEditing}
        title="Edit user"
        onOk={this.onEditSave}
        onCancel={this.onEditCancel}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.onEditSave}
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
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

const mapDispatchToProps = {
  closeEditForm,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddUserFrom));
