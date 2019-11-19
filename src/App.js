/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 15:50:37
 * @description: 入口文件
 */
import React from "react";
import PrivateRoute from 'component/privateRoute/index';
import Login from 'pages/login/index.jsx';
import Home from 'pages/home/index.jsx';
import LayoutElem from 'layout/index.jsx';
import ErrorPage from 'pages/404/index.jsx';
import FileUpload from 'pages/fileUpload/index';
import FileUploadDetail from 'pages/fileUpload/detail';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store/index";
// 把antd内置的英文改成中文
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
// 把antd内置的英文改成中文

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" render={props => (
                <LayoutElem history={props.history}>
                  <Switch>
                    <PrivateRoute exact path="/" breadcrumbName="工作台" component={Home} />
                    <PrivateRoute path="/form/fileUpload" breadcrumbName="文件上传" component={FileUpload} />
                    <PrivateRoute path="/form/fileUploadDetail" breadcrumbName="文件上传详情" component={FileUploadDetail} />
                    <Route component={ErrorPage} />
                  </Switch>
                </LayoutElem>
              )} />
            </Switch>
          </Router>
        </Provider>
      </ConfigProvider>
    )
  }
}
