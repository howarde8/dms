import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Table, Popconfirm } from "antd";
import AddUserForm from "./AddUserForm";
import EditUserModalForm from "./EditUserModalForm";
import { getAllUsers, addUser, deleteUser, openEditForm } from "../../actions";

class User extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  onEditClick = (record, index) => {
    this.props.openEditForm({ index, ...record });
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
        <div>User</div>
        <div>
          <AddUserForm />
        </div>
        <div>{this.renderTable()}</div>
        <EditUserModalForm />
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
  deleteUser,
  openEditForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);