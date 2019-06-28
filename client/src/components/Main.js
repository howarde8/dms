import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";

const User = () => {
  return <div>User</div>;
};

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
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/product" component={Product} />
        <Route path="/order" component={Order} />
      </div>
    );
  }
}

export default Main;
