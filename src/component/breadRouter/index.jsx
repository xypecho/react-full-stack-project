/*
 * @Author: xueyp
 * @Date: 2019-11-19 15:23:48
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 13:38:26
 * @description: 面包屑导航
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import Tools from 'utils/tools';

const _Tools = new Tools();

export default class BreadRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            router: []
        }
    }
    componentDidMount() {
        this.setState({
            router: _Tools.findSubMenu(this.props.menus, this.props.pathname)
        })
    }
    UNSAFE_componentWillReceiveProps(val) {
        this.setState({
            router: _Tools.findSubMenu(this.props.menus, val.pathname)
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
