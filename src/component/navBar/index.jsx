/*
 * @Author: xueyp
 * @Date: 2019-11-21 14:44:01
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 17:48:00
 * @description: 二次封装antd的menu
 */
import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const createSubMenu = (route) => {
    const children = route.subs;
    return (
        <SubMenu key={route.key} title={<span><Icon type={route.icon} /><span>{route.title}</span></span>}>
            {children.map(item => {
                return !item.subs ?
                    (<Menu.Item key={item.key}>{item.title}</Menu.Item>) : createSubMenu(item)
            })}
        </SubMenu>
    )
}
export default class NavBar extends React.Component {
    rootSubmenuKeys = ['/', '/form', '/config', '/auth', '/404'];
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ['/'],
            currentUrl: '/'
        };
    }
    handleItemClick(data) {
        this.props.history.push(data.key)
        this.setState({
            currentUrl: data.key
        })
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
    componentDidMount() {
        const pathname = window.location.pathname;
        this.setState({
            currentUrl: pathname
        });
    }
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} openKeys={this.state.openKeys} selectedKeys={[this.state.currentUrl]}
                onClick={({ item, key, keyPath, domEvent }) => this.handleItemClick({ item, key, keyPath, domEvent })} onOpenChange={(openKeys) => this.onOpenChange(openKeys)}>
                {
                    this.props.menus.map(item => {
                        if (!item.subs) {
                            return (
                                <Menu.Item key={item.key}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Menu.Item>
                            )
                        } else {
                            return createSubMenu(item)
                        }
                    })
                }
            </Menu>
        )
    }
}