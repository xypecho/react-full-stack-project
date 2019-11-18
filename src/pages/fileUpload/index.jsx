/*
 * @Author: xueyp
 * @Date: 2019-11-18 10:22:38
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-18 15:24:15
 * @description: 文件上传
 */
import React from 'react';
import New_Pagination from 'component/pagination/index';
import { Table, Divider } from 'antd';
import { getFilesList } from 'api/upload';
import './index.styl';

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dableData: [],
            total: 0,
            prams: {
                currentPage: 1,
                pageSize: 5
            }
        }
    }
    UNSAFE_componentWillMount() {
        this.getFilesListApi();
    }
    getFilesListApi() {
        getFilesList(this.state.prams).then(res => {
            this.setState({
                dableData: res.data.data,
                total: res.data.total
            })
        })
    }
    pageChange(data) {
        this.setState({
            prams: {
                currentPage: data.current,
                pageSize: data.pageSize
            }
        }, () => {
            this.getFilesListApi();
        })
    }
    render() {
        const columns = [
            {
                title: '上传者',
                dataIndex: 'username',
            },
            {
                title: '上传时间',
                dataIndex: 'upload_time',
                render: text => <span>{new Date(text).toLocaleString()}</span>,
            },
            {
                title: '文件描述',
                dataIndex: 'files_description',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>查看</a>
                        <Divider type="vertical" />
                        <a>删除</a>
                    </span>
                ),
            },
        ];
        return (
            <div className='fileUpload'>
                <Table columns={columns} dataSource={this.state.dableData} pagination={false} rowKey="upload_time" />
                <New_Pagination total={this.state.total} pageChange={(data) => this.pageChange(data)} />
            </div>
        )
    }
}