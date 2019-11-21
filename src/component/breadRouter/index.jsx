/*
 * @Author: xueyp
 * @Date: 2019-11-19 15:23:48
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 17:12:56
 * @description: 面包屑导航
 */
import React from 'react';
import { Breadcrumb } from 'antd';

const findSubMenu = (menus, pathname) => {
    const arr = [];
    const loop = (menus) => {
        return menus.some(item => {
            if (item.key === pathname) {
                arr.unshift({ key: item.key, title: item.title })
                return true
            } else {
                if (item.subs) {
                    let hasSamePathname = loop(item.subs, pathname);
                    if (hasSamePathname) {
                        arr.unshift({ key: item.key, title: item.title })
                    }
                    return hasSamePathname;
                }
            }
        })
    }
    loop(menus);
    return arr;
}

export default class BreadRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            router: []
        }
    }
    componentDidMount() {
        const pathname = window.location.pathname;
        this.setState({
            router: findSubMenu(this.props.menus, pathname)
        })
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {
                    this.state.router.map(item => {
                        return (
                            <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}
