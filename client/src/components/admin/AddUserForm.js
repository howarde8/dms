import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Icon, Select, Spin } from "antd";
import { addUser, getAllLevels } from "../../actions";

class AddUserFrom extends Component {
  componentDidMount() {
    this.props.getAllLevels();
  }

  onAddUser = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUser({
          username: values.username,
          password: values.password,
          name: values.name,
          level: values.level
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (!this.props.level.levels) {
      return <Spin />;
    }
    return (
      <Form onSubmit={this.onAddUser} style={{ maxWidth: "300px" }}>
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
          {getFieldDecorator("level")(
            <Select placeholder="Please select a level">
              {this.props.level.levels.map(level => (
                <Select.Option key={level.name} value={level.name}>
                  {level.name}
                </Select.Option>
              ))}
            </Select>
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

function mapStateToProps({ level }) {
  return { level };
}

const mapDispatchToProps = {
  addUser,
  getAllLevels
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddUserFrom));
