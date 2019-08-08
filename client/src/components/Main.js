import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";
import Header from "./Header";
import Profile from "./Profile";
import User from "./admin/User";
import Level from "./admin/Level";
import { fetchUser, logout } from "../actions/authAction";

const Product = () => {
  return <div>Product</div>;
};

const Order = () => {
  return <div>Order</div>;
};

const Home = () => {
  return <div>Home</div>;
};

class Main extends Component {
  onLogoutClick = () => {
    this.props.logout();
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    switch (this.props.auth.user) {
      case undefined:
      case null:
        return <Spin />;
      case false:
        return <Redirect to="/login" />;
      default:
        return (
          <div>
            <Header auth={this.props.auth} onLogoutClick={this.onLogoutClick} />
            <div style={{ margin: "20px" }}>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              {this.props.auth.user.level === "ADMIN" ? (
                <div>
                  <Route path="/user" component={User} />
                  <Route path="/level" component={Level} />
                </div>
              ) : (
                <div>
                  <Route path="/product" component={Product} />
                  <Route path="/order" component={Order} />
                </div>
              )}
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = {
  fetchUser,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
