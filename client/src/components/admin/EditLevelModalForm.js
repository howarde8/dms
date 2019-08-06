import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Modal } from "antd";
import { closeEditForm, updateLevel } from "../../actions/levelAction";

class EditLevelModalForm extends Component {
  onEditSave = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateLevel(this.props.level.editingLevel.name, values.name);
      }
    });
    this.props.closeEditForm();
  };

  onEditCancel = () => {
    this.props.closeEditForm();
  };

  render() {
    if (!this.props.level.isEditing) {
      // Prevent initialValue only shows 1 time
      this.props.form.resetFields();
    }

    const { getFieldDecorator } = this.props.form;
    const { name } = this.props.level.editingLevel
      ? this.props.level.editingLevel
      : {};
    return (
      <Modal
        visible={this.props.level.isEditing}
        title="Edit level"
        onOk={this.onEditSave}
        onCancel={this.onEditCancel}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.onEditSave}
        >
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input name" }],
              initialValue: this.props.level.isEditing ? name : ""
            })(<Input type="name" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ level }) => ({ level });

const mapDispatchToProps = {
  closeEditForm,
  updateLevel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditLevelModalForm));
