/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 15:24:23
 * @description: 首页布局
 */
import React from "react";
import BreadRouter from 'component/breadRouter/index.jsx';
import NavBar from 'component/navBar/index.jsx'
import { Layout, Menu, Icon, Dropdown, Modal } from 'antd';
import { connect } from 'react-redux';
import menus from 'router/index';
import defaultAvatar from 'assets/images/avatar.gif';
import './index.styl';

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
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
            marginLeft: this.state.collapsed ? '200px' : '80px'
        });
    };
    handleDropMenuClick({ key }) {
        if (key === '1') {
            this.props.history.push('/config/account');
        } else {
            confirm({
                title: '警告',
                content: '此操作将退出系统, 是否继续?',
                onOk() {
                    window.localStorage.clear();
                    window.location.reload();
                    window.location.href = window.location.origin;
                },
            });
        }
    }
    render() {
        console.log(this.props.userInfo)
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
                    <NavBar history={this.props.history} menus={menus} />
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
                            <img src={this.props.userInfo.avatar || defaultAvatar} alt="" height="40" width="40" />
                        </div>
                    </Header>
                    <Content
                        style={{
                            height: 'calc(100vh - 64px)',
                            overflow: 'initial'
                        }}
                    >
                        <BreadRouter menus={menus} pathname={this.props.history.location.pathname} />
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};
export default connect(mapStateToProps)(LayoutElem);