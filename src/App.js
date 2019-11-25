/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 10:42:32
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
import Step1 from 'pages/stepForm/component/step1.jsx';
import Step2 from 'pages/stepForm/component/step2.jsx';
import Step3 from 'pages/stepForm/component/step3.jsx';
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
                    <PrivateRoute path="/form/stepForm/step1" breadcrumbName="验证身份" component={Step1} />
                    <PrivateRoute path="/form/stepForm/step2" breadcrumbName="设置新密码" component={Step2} />
                    <PrivateRoute path="/form/stepForm/step3" breadcrumbName="完成" component={Step3} />
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
