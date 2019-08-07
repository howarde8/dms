import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Spin, Typography } from "antd";

class Header extends Component {
  renderUser = () => {
    switch (this.props.auth.user) {
      case undefined:
      case null:
        return <Spin />;
      case false:
        return <div />;
      default:
        return (
          <div>
            <Link to="/profile">
              <Button ghost type="link" icon="user">
                {this.props.auth.user.username}
              </Button>
            </Link>
            <Button
              ghost
              type="link"
              icon="logout"
              onClick={this.props.onLogoutClick}
            >
              Logout
            </Button>
          </div>
        );
    }
  };

  renderMenu = () => {
    switch (this.props.auth.user) {
      case undefined:
      case null:
        return <Spin />;
      case false:
        return <div />;
      default:
        const menuProp = {
          theme: "dark",
          mode: "horizontal",
          selectable: false,
          style: { float: "left", lineHeight: "64px" }
        };
        return this.props.auth.user.level === "ADMIN" ? (
          <Menu {...menuProp}>
            <Menu.Item key="user">
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="level">
              <Link to="/level">Level</Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="/order">Order</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{ float: "left", lineHeight: "64px" }}
          >
            <Menu.Item key="product">
              <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="/order">Order</Link>
            </Menu.Item>
          </Menu>
        );
    }
  };

  render() {
    return (
      <Layout.Header>
        <Link to="/">
          <Typography
            style={{
              float: "left",
              marginRight: "40px",
              color: "white",
              fontSize: "24px"
            }}
          >
            DMS
          </Typography>
        </Link>
        {this.renderMenu()}
        <Typography
          style={{
            float: "right"
          }}
        >
          {this.renderUser()}
        </Typography>
      </Layout.Header>
    );
  }
}

export default Header;
