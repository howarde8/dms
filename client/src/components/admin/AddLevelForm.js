import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { addLevel } from "../../actions/levelAction";

class AddLevelFrom extends Component {
  onAddLevel = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addLevel({
          name: values.name
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="inline"
        onSubmit={this.onAddLevel}
        style={{ maxWidth: "300px" }}
      >
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input name" }]
          })(<Input type="name" placeholder="Name" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  addLevel
};

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(AddLevelFrom));
