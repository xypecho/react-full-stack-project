/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-23 17:01:48
 * @description: 首页布局
 */
import React, { useState } from "react";
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

function LayoutElem() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    Content
          </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutElem;