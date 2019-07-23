import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history"
import Main from "./components/Main";
import Login from "./components/Login";
import "antd/dist/antd.css";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
