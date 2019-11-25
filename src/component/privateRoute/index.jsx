/*
 * @Author: xueyp
 * @Date: 2019-11-14 14:53:15
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 15:26:17
 * @description: 封装需要登录后才能展示的页面
 */
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem('userInfo')
        }
    }
    UNSAFE_componentWillMount() {
        if (!this.state.isLogin) {
            const { history } = this.props;
            setTimeout(() => {
                history.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
            }, 1000)
        }
    }
    render() {
        const { component: Component, ...rest } = this.props;
        return this.state.isLogin ?
            (<Route {...rest} render={(props) => (<Component {...props} />
            )} />) : (<p style={{ "width": "100%", "textAlign": "center", "fontSize": "20px", "lineHeight": "50px" }}>请登录...</p>)

    }
}

export default withRouter(PrivateRoute);