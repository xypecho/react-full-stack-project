/*
 * @Author: xueyp
 * @Date: 2019-10-23 15:17:37
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-24 17:12:44
 * @description: 登录页面
 */
import React from "react";
import { Tabs } from 'antd';
import LoginForm from './logoin.jsx';
import RegisterForm from './register.jsx';
import './index.styl';
const { TabPane } = Tabs;

function Login() {
    return (
        <div className="login">
            <div className="textBox">
                <h2>切图仔誓言</h2>
                <p>成功将至，我从今开始发奋，至死方休。</p>
                <p>我将不毁约、不放弃、不后退。</p>
                <p>我将不耻下问，不持材自傲。</p>
                <p>我将不畏困难，不惧诱惑。</p>
                <p>我是荆棘中的利剑，战场上的勇士。</p>
                <p>我是抵御寒冷的烈焰，破晓时分的光线，唤醒沉睡者的号角，守护梦想的坚盾。</p>
                <p>我将生命与荣耀献给优秀，今日如此，日日皆然。</p>
            </div>
            <div className="loginBox" v-loading='loading'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="注册" key="1">
                        <RegisterForm />
                    </TabPane>
                    <TabPane tab="登录" key="2">
                        <LoginForm />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Login;
