/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-18 10:25:29
 * @description: 入口文件
 */
import React from "react";
import PrivateRoute from 'component/privateRoute/index';
import Login from 'pages/login/index.jsx';
import Home from 'pages/home/index.jsx';
import LayoutElem from 'layout/index.jsx';
import ErrorPage from 'pages/404/index.jsx';
import FileUpload from 'pages/fileUpload/index';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store/index";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" render={props => (
              <LayoutElem history={props.history}>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute path="/form/fileUpload" component={FileUpload} />
                  <Route component={ErrorPage} />
                </Switch>
              </LayoutElem>
            )} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
