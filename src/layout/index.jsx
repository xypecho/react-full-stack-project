/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-14 21:56:27
 * @description: 首页布局
 */
import React from "react";
import './index.styl';
import { Layout, Menu, Icon, Dropdown, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

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
    handleDropMenuClick({ key }) {
        if (key === '1') {

        } else {
            confirm({
                title: '警告',
                content: '此操作将退出系统, 是否继续?',
                onOk() {
                    window.localStorage.clear();
                    window.location.reload();
                },
            });
        }
    }
    render() {
        const menu = (
            <Menu onClick={(data) => this.handleDropMenuClick(data)}>
                <Menu.Item key="1">账户设置</Menu.Item>
                <Menu.Item key="2">退出登录</Menu.Item>
            </Menu>
        );
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
                            <span className='username' style={{ userSelect: 'none' }}>{this.props.userInfo.username}</span>
                        </Dropdown>
                        <div className="avatar">
                            <img src={this.props.userInfo.avatar} alt="" height="40" width="40" />
                        </div>
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
export default connect(mapStateToProps)(LayoutElem);