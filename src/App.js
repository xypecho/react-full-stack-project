/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-27 14:20:38
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
import StepForm from 'pages/stepForm/index.jsx';
import User from 'pages/user/index.jsx';
import Account from 'pages/account/index.jsx';
import Auth from 'pages/auth/index.jsx';
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
                    <PrivateRoute path="/form/stepForm" breadcrumbName="分步表单" component={StepForm} />
                    <PrivateRoute path="/config/user" breadcrumbName="用户管理" component={User} />
                    <PrivateRoute path="/config/account" breadcrumbName="帐号设置" component={Account} />
                    <PrivateRoute path="/auth" breadcrumbName="权限测试页" component={
                      () => (JSON.parse(localStorage.userInfo).uid === 1 ? <Auth history={props.history}/> : <ErrorPage history={props.history}/>)
                    } />
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
