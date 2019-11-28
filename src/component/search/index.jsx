/*
 * @Author: xueyp
 * @Date: 2019-11-25 17:15:39
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 15:00:27
 * @description: 封装搜索组件
 */
import React from 'react';
import { Select, DatePicker, Input, Button } from 'antd';
import './index.styl';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                status: undefined,
                timeRange: [null, null],
                like: ''
            }
        }
    }
    isShow(name) {
        return this.props.searchTypes.indexOf(name) !== -1;
    }
    handleChange({ value, str, type }) {
        switch (type) {
            case 'accountStatus':
                this.setState({
                    searchParams: { ...this.state.searchParams, status: value }
                })
                break;
            case 'timeRange':
                this.setState({
                    searchParams: { ...this.state.searchParams, timeRange: value }
                })
                break;
            default:
                this.setState({
                    searchParams: { ...this.state.searchParams, like: value }
                })
                break;
        }
    }
    handleSearch(type) {
        if (type === 0) {
            this.setState({
                searchParams: {
                    status: undefined,
                    timeRange: [],
                    like: ''
                }
            }, () => {
                this.props.handleSearch(this.state.searchParams);
            })
        } else {
            const form = JSON.parse(JSON.stringify(this.state.searchParams));
            if (form.timeRange.length > 0 && form.timeRange[0]) {
                form.timeRange[0] = new Date(this.state.searchParams.timeRange[0]).getTime();
                form.timeRange[1] = new Date(this.state.searchParams.timeRange[1]).getTime();
            } else {
                form.timeRange = [];
            }
            this.props.handleSearch(form);
        }
    }
    render() {
        return (
            <div className="search-wrapper">
                {
                    this.isShow('accountStatus') ? (
                        <div className="search-item">
                            <Select placeholder="请选择帐号状态" value={this.state.searchParams.status} onChange={(value) => this.handleChange({ value, type: 'accountStatus' })}>
                                <Option value="1">正常</Option>
                                <Option value="0">已注销</Option>
                            </Select>
                        </div>
                    ) : null
                }
                {
                    this.isShow('timeRange') ? (
                        <div className="search-item">
                            <RangePicker value={this.state.searchParams.timeRange} onChange={(value, str) => this.handleChange({ value, str, type: 'timeRange' })} />
                        </div>
                    ) : null
                }
                {
                    this.isShow('like') ? (
                        <div className="search-item">
                            <Input placeholder="请输入用户名" value={this.state.searchParams.like} onChange={(value) => this.handleChange({ value: value.target.value, type: 'like' })} />
                        </div>
                    ) : null
                }
                <div className="search-item">
                    <Button type="primary" onClick={() => this.handleSearch(1)}>搜索</Button>
                    <Button type="primary" onClick={() => this.handleSearch(0)}>重置</Button>
                </div>
            </div>
        )
    }
}
