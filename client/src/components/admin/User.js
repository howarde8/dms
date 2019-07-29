import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Icon, Spin, Table, Popconfirm } from "antd";
import { getAllUsers, addUser, deleteUser } from "../../actions";

class User extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

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

  onDeleteUser = (key, index) => {
    this.props.deleteUser(key, index);
  };

  renderTable = () => {
    if (!this.props.user.users) {
      return <Spin />;
    }
    const data = this.props.user.users.map(user => ({
      key: user.username,
      ...user
    }));
    return (
      <Table
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Username", dataIndex: "username", key: "username" },
          { title: "Level", dataIndex: "level", key: "level" },
          {
            title: "Edit",
            key: "edit",
            render: (text, record, index) => (
              <Popconfirm
                title={`Are you sure to delete ${record.name}?`}
                onConfirm={() => this.onDeleteUser(record.key, index)}
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            )
          }
        ]}
        dataSource={data}
      />
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>User</div>
        <div>
          <Form onSubmit={this.onAddUser}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Please input username" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input password" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
        </div>
        <div>{this.renderTable()}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

const mapDispatchToProps = {
  getAllUsers,
  addUser,
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(User));
