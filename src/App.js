/*
 * @Author: xueyp
 * @Date: 2019-10-23 14:12:21
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-23 15:13:53
 * @description: 入口文件
 */
import React from "react";
import Login from '@/page/login/index.jsx';
import Layout from '@/layout/index.jsx';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" render={props => (
          <Layout>
            {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/product" component={ProductRouter} />
              <Route path="/product-category" component={ProductRouter} />
              <Route path='/user/index' component={UserList} />
              <Redirect exact from='/user' to='/user/index' />
              <Route component={ErrorPage} />
            </Switch> */}
          </Layout>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
