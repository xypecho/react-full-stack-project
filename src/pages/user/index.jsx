/*
 * @Author: xueyp
 * @Date: 2019-11-25 14:49:14
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 14:58:32
 * @description: 用户管理
 */
import React from 'react';
import NewPagination from 'component/pagination/index';
import { Table, Switch, message, Spin, Button } from 'antd';
import { getUserList, deleteUser, editUser } from 'api/user';
import { connect } from 'react-redux';
import defaultAvatar from 'assets/images/avatar.gif';
import Search from 'component/search/index.jsx';
import './index.styl';

const searchTypes = ['accountStatus', 'timeRange', 'like'];

class User extends React.Component {
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
        getUserList(this.state.prams).then(res => {
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
    handleDelete(text) {
        const uid = Number(text.uid);
        const userUid = Number(this.props.userInfo.uid);
        if (uid === 1 && userUid === 1) {
            message.warning('管理员不可以删除');
        } else if (userUid !== 1) {
            message.warning('当前登录帐号无操作权限');
        } else {
            deleteUser({ uid: text.uid }).then(res => {
                message.success('删除成功');
                this.getUserListApi();
            })
        }
    }
    handleChange(data, record) {
        let tag = data ? 1 : 0;
        record.status = tag;
        editUser({ userInfo: record });
    }
    handleSearch(params) {
        this.setState({
            prams: {
                ...this.state.prams,
                data: params
            }
        }, () => {
            this.getUserListApi();
        })
    }
    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: 'id',
                dataIndex: 'uid',
            },
            {
                title: '头像',
                dataIndex: 'avatar',
                render: text => <img src={text || defaultAvatar} alt="" width="50" height="50" />
            },
            {
                title: '角色',
                dataIndex: 'utype',
                render: text => <span>{text === 0 ? '管理员' : '普通会员'}</span>,
            },
            {
                title: '是否启用',
                dataIndex: 'status',
                render: (text, record) => (<Switch defaultChecked={text === 1 ? true : false} disabled={this.props.userInfo.uid === 1 ? false : true} onChange={(data) => this.handleChange(data, record)} />)

            },
            {
                title: '帐号状态',
                dataIndex: 'is_deleted',
                render: text => <span>{text === 0 ? '已注销' : '正常'}</span>,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '注册时间',
                dataIndex: 'register_time',
                render: text => <span>{new Date(text).toLocaleString()}</span>,
            },
            {
                title: '最后登录时间',
                dataIndex: 'last_login_time',
                render: text => <span>{new Date(text).toLocaleString()}</span>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button onClick={() => this.handleDelete(text, record)} type="link">
                            删除
                        </Button>
                    </span>
                ),
            },
        ];
        return (
            <div className='fileUpload'>
                <Spin spinning={this.state.loading}>
                    <Search searchTypes={searchTypes} handleSearch={(params) => this.handleSearch(params)} />
                    <Table columns={columns} dataSource={this.state.dableData} pagination={false} rowKey="uid" />
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
export default connect(mapStateToProps)(User);
