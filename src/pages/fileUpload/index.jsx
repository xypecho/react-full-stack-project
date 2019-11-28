/*
 * @Author: xueyp
 * @Date: 2019-11-18 10:22:38
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 14:54:17
 * @description: 文件上传
 */
import React from 'react';
import NewPagination from 'component/pagination/index';
import ProgressUpload from 'component/rUpload/progressUpload/index';
import { Table, Divider, message, Spin, Button } from 'antd';
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
                        <Button type="link" onClick={() => this.handleDetail(text)}>
                            查看
                        </Button>
                        <Divider type="vertical" />
                        <Button type="link" onClick={() => this.handleDelete(text, record)}>
                            删除
                        </Button>
                    </span>
                ),
            },
        ];
        return (
            <div className='fileUpload'>
                <Spin spinning={this.state.loading}>
                    <ProgressUpload successUpload={() => this.successUpload()} />
                    <Table columns={columns} dataSource={this.state.dableData} pagination={false} rowKey="upload_time" />
                    <NewPagination total={this.state.total} pageChange={(data) => this.pageChange(data)} />
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