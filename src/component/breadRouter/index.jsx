/*
 * @Author: xueyp
 * @Date: 2019-11-19 15:23:48
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 15:25:49
 * @description: 面包屑导航
 */
import React from 'react';
import { Breadcrumb } from 'antd';

export default class BreadRouter extends React.Component {
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
