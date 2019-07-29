import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";
import Header from "./Header";
import User from "./admin/User"
import { fetchUser, logout } from "../actions";

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
  }

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
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/product" component={Product} />
            <Route path="/order" component={Order} />
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
