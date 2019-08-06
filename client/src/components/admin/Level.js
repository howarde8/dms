import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, Spin, Popconfirm } from "antd";
import {
  getAllLevels,
  deleteLevel,
  openEditForm
} from "../../actions/levelAction";
import AddLevelForm from "./AddLevelForm";
import EditLevelModalForm from "./EditLevelModalForm";

class Level extends Component {
  componentDidMount() {
    this.props.getAllLevels();
  }

  onEditClick = (record, index) => {
    this.props.openEditForm(record, index);
  };

  onDeleteLevel = (key, index) => {
    this.props.deleteLevel(key, index);
  };

  renderTable = () => {
    if (!this.props.level.levels) {
      return <Spin />;
    }
    const data = this.props.level.levels.map(level => ({
      key: level.name,
      name: level.name
    }));

    return (
      <Table
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
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
                  onConfirm={() => this.onDeleteLevel(record.key, index)}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={data}
        style={{ maxWidth: "350px" }}
      />
    );
  };

  render() {
    return (
      <div>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <AddLevelForm />
          </div>
          {this.renderTable()}
        </div>
        <EditLevelModalForm />
      </div>
    );
  }
}

function mapStateToProps({ level }) {
  return { level };
}

const mapDispatchToProps = {
  getAllLevels,
  deleteLevel,
  openEditForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
