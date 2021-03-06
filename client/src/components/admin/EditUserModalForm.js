import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Modal, Select } from "antd";
import { closeEditForm, updateUser } from "../../actions/userAction";
import { getAllLevels } from "../../actions/levelAction";

class EdituserModalForm extends Component {
  componentDidMount() {
    this.props.getAllLevels();
  }

  onEditSave = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateUser(values);
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
    if (!this.props.level.levels) {
      return <div />;
    }

    const { getFieldDecorator } = this.props.form;
    const { username, name, level, email } = this.props.user.editingUser
      ? this.props.user.editingUser
      : {};
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
              initialValue: this.props.user.isEditing ? username : ""
            })(<Input type="username" disabled />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input name" }],
              initialValue: this.props.user.isEditing ? name : ""
            })(<Input type="name" />)}
          </Form.Item>
          <Form.Item label="Level">
            {getFieldDecorator("level", {
              initialValue: this.props.user.isEditing ? level : undefined
            })(
              <Select placeholder="Please select a level">
                {this.props.level.levels.map(level => (
                  <Select.Option key={level.name} value={level.name}>
                    {level.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: this.props.user.isEditing ? email : ""
            })(<Input type="email" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user, level }) => ({ user, level });

const mapDispatchToProps = {
  closeEditForm,
  updateUser,
  getAllLevels
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EdituserModalForm));
