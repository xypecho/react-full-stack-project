/*
 * @Author: xueyp
 * @Date: 2019-11-27 14:39:59
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 14:43:10
 * @description: 操作日志
 */
import React from 'react';
import NewPagination from 'component/pagination/index';
import { Table, Spin } from 'antd';
import { getOperationLogList} from 'api/log';
import './index.styl';

export default class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dableData: [],
            total: 0,
            prams: {
                currentPage: 1,
                pageSize: 5,
                data: {}
            }
        }
    }
    UNSAFE_componentWillMount() {
        this.getUserListApi();
    }
    getUserListApi() {
        this.setState({
            loading: true
        })
        getOperationLogList(this.state.prams).then(res => {
            this.setState({
                dableData: res.data.data,
                total: res.data.total,
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false,
                dableData: [],
                total: 0
            })
        })
    }
    pageChange(data) {
        this.setState({
            prams: {
                currentPage: data.current,
                pageSize: data.pageSize,
                data: {}

            }
        }, () => {
            this.getUserListApi();
        })
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
            },
            {
                title: '操作人',
                dataIndex: 'operator',
            },
            {
                title: '操作时间',
                dataIndex: 'operationTime',
                render: text => <span>{new Date(text).toLocaleString()}</span>
            },
            {
                title: '操作描述',
                dataIndex: 'operationDescription',
            },
        ];
        return (
            <div className='fileUpload'>
                <Spin spinning={this.state.loading}>
                    <Table columns={columns} dataSource={this.state.dableData} pagination={false} rowKey="id" />
                    <NewPagination total={this.state.total} pageChange={(data) => this.pageChange(data)} />
                </Spin>
            </div>
        )
    }
}
