import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Table, Popconfirm, Tabs } from "antd";
import AddUserForm from "./AddUserForm";
import EditUserModalForm from "./EditUserModalForm";
import { getAllUsers, addUser, deleteUser, openEditForm } from "../../actions";

class User extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  onEditClick = (record, index) => {
    this.props.openEditForm(record, index);
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
          { title: "Username", dataIndex: "username", key: "username" },
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Level", dataIndex: "level", key: "level" },
          {
            title: "Edit",
            key: "edit",
            render: (text, record, index) => (
              <div>
                <Button onClick={() => this.onEditClick(record, index)}>
                  Edit
                </Button>
                <Popconfirm
                  title={`Are you sure to delete ${record.name}?`}
                  onConfirm={() => this.onDeleteUser(record.key, index)}
                >
                  <Button>Delete</Button>
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={data}
      />
    );
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Users" key="1">
            {this.renderTable()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add User" key="2">
            <AddUserForm />
          </Tabs.TabPane>
        </Tabs>
        <EditUserModalForm />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  getAllUsers,
  addUser,
  deleteUser,
  openEditForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
