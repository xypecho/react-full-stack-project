/*
 * @Author: xueyp
 * @Date: 2019-11-18 13:33:30
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 15:03:03
 * @description: 封装分页组件
 */
import React from 'react';
import { Pagination } from 'antd';
import './index.styl';

export default class New_Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 5
        }
    }
    onPageChange(current) {
        this.setState({
            current
        }, () => {
            this.props.pageChange(this.state);
        })
    }
    onSizeChange(current, pageSize) {
        this.setState({
            current: 1,
            pageSize
        }, () => {
            this.props.pageChange(this.state);
        })
    }
    render() {
        return (
            <div className='pagination-wrapper'>
                <Pagination {...this.props} size="small" showSizeChanger showQuickJumper current={this.state.current} pageSize={this.state.pageSize} onChange={(current, pageSize) => { this.onPageChange(current, pageSize) }} onShowSizeChange={(current, size) => { this.onSizeChange(current, size) }} />
            </div>
        )
    }
}