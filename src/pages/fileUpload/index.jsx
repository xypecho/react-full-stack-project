/*
 * @Author: xueyp
 * @Date: 2019-11-18 10:22:38
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 10:53:33
 * @description: 文件上传
 */
import React from 'react';
import New_Pagination from 'component/pagination/index';
import ProgressUpload from 'component/rUpload/progressUpload/index';
import { Table, Divider, message, Spin } from 'antd';
import { getFilesList, deleteUploadList } from 'api/upload';
import { connect } from 'react-redux';
import './index.styl';

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
        this.setState({
            loading: true
        })
        getFilesList(this.state.prams).then(res => {
            this.setState({
                dableData: res.data.data,
                total: res.data.total,
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
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
    handleDelete(text) {
        deleteUploadList({ id: text.id, uid: this.props.userInfo.uid }).then(res => {
            message.success('文件删除成功');
            this.getFilesListApi();
        })
    }
    handleDetail(text) {
        this.props.history.push({ pathname: '/form/fileUploadDetail', state: { text } });
    }
    successUpload() {
        this.getFilesListApi();
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
                        <a onClick={() => this.handleDetail(text)}>查看</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.handleDelete(text, record)}>删除</a>
                    </span>
                ),
            },
        ];
        return (
            <div className='fileUpload'>
                <Spin spinning={this.state.loading}>
                    <ProgressUpload successUpload={() => this.successUpload()} />
                    <Table columns={columns} dataSource={this.state.dableData} pagination={false} rowKey="upload_time" />
                    <New_Pagination total={this.state.total} pageChange={(data) => this.pageChange(data)} />
                </Spin>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(FileUpload);