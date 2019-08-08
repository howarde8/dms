import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Spin, Row, Col, Divider } from "antd";
import { getUserMe, updateUserMe } from "../../actions/userAction";
import ChangePasswordForm from "./ChangePasswordForm";

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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmit={this.onSave}
        style={{ maxWidth: "550px" }}
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
        <Form.Item wrapperCol={{ span: 16, offset: 8, align: "left" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  render() {
    return (
      <Row>
        <Col span={11} align="middle">
          <Divider>Basic information</Divider>
          {this.renderMeForm()}
        </Col>
        <Col span={2} />
        <Col span={11} align="middle">
          <Divider>Password</Divider>
          <ChangePasswordForm />
        </Col>
      </Row>
    );
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
