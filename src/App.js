/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-12 17:05:10
 * @description: 入口文件
 */
import React from "react";
import Login from 'pages/login/index.jsx';
import Home from 'pages/home/index.jsx';
import LayoutElem from 'layout/index.jsx';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => (
            <LayoutElem>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </LayoutElem>
          )} />
        </Switch>
      </Router>
    )
  }
}
