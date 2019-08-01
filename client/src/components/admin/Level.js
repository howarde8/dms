import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, Spin, Popconfirm, Tabs } from "antd";
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
                <Button onClick={() => this.onEditClick(record, index)}>
                  Edit
                </Button>
                <Popconfirm
                  title={`Are you sure to delete ${record.name}?`}
                  onConfirm={() => this.onDeleteLevel(record.key, index)}
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
          <Tabs.TabPane tab="Levels" key="1">
            {this.renderTable()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add Level" key="2">
            <AddLevelForm />
          </Tabs.TabPane>
        </Tabs>
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
