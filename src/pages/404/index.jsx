/*
 * @Author: xueyp
 * @Date: 2019-11-15 14:25:19
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-15 14:30:35
 * @description: 404页面
 */
import React from 'react';
import Xuexiaoban from 'assets/images/xuexiaoban.png'
import './index.styl';

export default class ErrorPage extends React.Component {
    backToHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="notFound">
                <div className="notFound-left">
                    <img src={Xuexiaoban} alt="" />
                </div>
                <div className="notFound-right">
                    <p>似乎来到了神秘的世界哦...</p>
                    <span>请检查您输入的网址是否正确，可点击以下按钮返回主页或者去往源码主页</span>
                    <p className="notFound-tips" onClick={() => this.backToHome()}>返回工作台</p>
                    <p className="notFound-tips" onClick={this.props.history.goBack}>返回上一页</p>
                </div>
            </div>
        )
    }
}