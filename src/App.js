/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-24 11:28:09
 * @description: 入口文件
 */
import React from "react";
import Login from 'pages/login/index.jsx';
import LayoutElem from 'layout/index.jsx';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" render={props => (
          <LayoutElem>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </LayoutElem>
        )} /> */}
      </Switch>
    </Router>
  );
}

export default App;
