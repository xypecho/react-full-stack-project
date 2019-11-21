/*
 * @Author: xueyp
 * @Date: 2019-11-19 15:23:48
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 14:24:29
 * @description: 面包屑导航
 */
import React from 'react';
import { Breadcrumb } from 'antd';

export default class BreadRouter extends React.Component {
    componentDidMount() {
        console.log('===============')
        console.log(this.props.routers)
        console.log('===============')
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
                <Breadcrumb.Item>List1</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
