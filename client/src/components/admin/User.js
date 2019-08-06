import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Table, Popconfirm } from "antd";
import AddUserForm from "./AddUserForm";
import EditUserModalForm from "./EditUserModalForm";
import {
  getAllUsers,
  addUser,
  deleteUser,
  openEditForm
} from "../../actions/userAction";

class User extends Component {
  state = {
    isAddingUser: false
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  onAddUserClick = () => {
    this.setState(prevState => ({
      isAddingUser: !prevState.isAddingUser
    }));
  };

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
                <Button
                  shape="circle"
                  icon="edit"
                  onClick={() => this.onEditClick(record, index)}
                  style={{ marginRight: "5px" }}
                />
                <Popconfirm
                  title={`Are you sure to delete ${record.name}?`}
                  onConfirm={() => this.onDeleteUser(record.key, index)}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={data}
        style={{ maxWidth: "800px" }}
      />
    );
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          shape="circle"
          icon={this.state.isAddingUser ? "minus" : "plus"}
          onClick={this.onAddUserClick}
          style={{ marginBottom: "10px" }}
        />
        {this.state.isAddingUser ? <AddUserForm /> : <div />}
        <div>{this.renderTable()}</div>
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
