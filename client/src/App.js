import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
