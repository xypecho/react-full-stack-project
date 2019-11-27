/*
 * @Author: xueyp
 * @Date: 2019-11-27 14:07:10
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-27 14:22:14
 * @description: 权限测试页
 */
import React from 'react';
import StandImage from 'assets/images/stand.png';
import './index.styl';

export default class Auth extends React.Component {
    backToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="admin">
                <div className="admin-left">
                    <img src={StandImage} alt="" />
                </div>
                <div className="admin-right">
                    <p>这是只有管理员账户才能看到的页面哦...</p>
                    <span>只有管理员账户登录时才能进入此页面，非管理员账户点击时会跳转至404页面</span>
                    <p className="admin-right-tips" onClick={() => this.backToHome()}>返回工作台</p>
                    <p className="admin-right-tips" onClick={this.props.history.goBack}>返回上一页</p>
                </div>
            </div>
        )
    }
}