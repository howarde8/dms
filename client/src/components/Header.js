import React, { Component } from "react";
import { Button } from "antd";

class Header extends Component {
  render() {
    return (
      <div>
        <div>Header</div>
        <div>
          <p>User: {this.props.auth.user.username}</p>
          <Button onClick={this.props.onLogoutClick}>Logout</Button>
        </div>
      </div>
    );
  }
}

export default Header;
