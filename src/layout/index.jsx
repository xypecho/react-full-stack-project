/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-14 20:47:32
 * @description: 首页布局
 */
import React from "react";
import './index.styl';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

const { Header, Sider, Content } = Layout;
const menu = (
    <Menu>
        <Menu.Item key="1">账户设置</Menu.Item>
        <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
);

class LayoutElem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            marginLeft: '200px'
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            marginLeft: this.state.collapsed ? '200px' : '80px'
        });
    };
    render() {
        const { test } = this.props;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                    style={{
                        height: '100vh',
                        overflow: 'auto',
                        position: 'fixed',
                        left: 0,
                    }}>
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
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        <Icon type="upload" />
                                        <span>{item}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: this.state.marginLeft, transition: 'all 0.2s' }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => this.toggle()}
                        />
                        <Dropdown overlay={menu} trigger={['hover']}>
                            <span style={{ userSelect: 'none' }}>Right Click on Me</span>
                        </Dropdown>
                    </Header>
                    <Content
                        style={{
                            height: 'calc(100vh - 64px)',
                            overflow: 'initial'
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        test(data) {
            console.log('==============')
            console.log(data)
            console.log('==============')
            dispatch(actionCreators.setUserInfo(data));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutElem);