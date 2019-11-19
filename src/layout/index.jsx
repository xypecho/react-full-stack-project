/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 15:47:26
 * @description: 首页布局
 */
import React from "react";
import BreadRouter from 'component/breadRouter/index.jsx';
import './index.styl';
import { Layout, Menu, Icon, Dropdown, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;

class LayoutElem extends React.Component {
    rootSubmenuKeys = ['/', '/form', '/config', '/auth', '/404'];
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            marginLeft: '200px',
            openKeys: ['/'],
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
    handleItemClick(data) {
        this.props.history.push(data.key)
    }
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} openKeys={this.state.openKeys}
                        onClick={({ item, key, keyPath, domEvent }) => this.handleItemClick({ item, key, keyPath, domEvent })} onOpenChange={(openKeys) => this.onOpenChange(openKeys)}>
                        <Menu.Item key="/">
                            <Icon type="dashboard" />
                            <span>工作台</span>
                        </Menu.Item>
                        <SubMenu
                            key="/form"
                            title={
                                <span>
                                    <Icon type="form" />
                                    <span>表单页</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5">分步表单</Menu.Item>
                            <Menu.Item key="/form/fileUpload">文件上传</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="/config"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>系统设置</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5">用户管理</Menu.Item>
                            <Menu.Item key="6">帐号设置</Menu.Item>
                            <Menu.Item key="7">操作日志</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/auth">
                            <Icon type="idcard" />
                            <span>权限测试页</span>
                        </Menu.Item>
                        <Menu.Item key="/404">
                            <Icon type="facebook" />
                            <span>404</span>
                        </Menu.Item>
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
                        <BreadRouter />
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