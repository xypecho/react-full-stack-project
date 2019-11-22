/*
 * @Author: xueyp
 * @Date: 2019-11-21 14:44:01
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-22 14:42:57
 * @description: 二次封装antd的menu
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import Tools from 'utils/tools';

const { SubMenu } = Menu;
const _Tools = new Tools();

const createSubMenu = (route) => {
    // 过滤掉不显示的菜单
    const children = route.subs.filter(item => !item.hidden);
    return (
        <SubMenu key={route.key} title={<span><Icon type={route.icon} /><span>{route.title}</span></span>}>
            {children.map(item => {
                if (item.subs && item.subs.some(val => !val.hidden)) {
                    return createSubMenu(item);
                } else {
                    return (<Menu.Item key={item.key}>{item.title}</Menu.Item>);
                }
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
        let menuArr = _Tools.findSubMenu(this.props.menus, pathname);
        const isSetOpenKeys = menuArr.length > 1;
        isSetOpenKeys && this.setState({ openKeys: [menuArr[0].key] });
        let currentUrl = isSetOpenKeys && menuArr[menuArr.length - 1].hidden ? menuArr[menuArr.length - 2].key : pathname;
        this.setState({
            currentUrl
        });
    }
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} openKeys={this.state.openKeys} selectedKeys={[this.state.currentUrl]}
                onClick={({ item, key, keyPath, domEvent }) => this.handleItemClick({ item, key, keyPath, domEvent })} onOpenChange={(openKeys) => this.onOpenChange(openKeys)}>
                {
                    this.props.menus.filter(menu => !menu.hidden).map(item => {
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