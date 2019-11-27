/*
 * @Author: xueyp
 * @Date: 2019-11-26 14:32:05
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-27 10:31:47
 * @description: 帐号设置
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Switch, Button, message } from 'antd';
import UploadAvatar from 'component/rUpload/rUpload/index.jsx';
import { editUser } from 'api/user';
import "./index.styl";

const formatterDate = (date) => new Date(date).toLocaleString();
const formatterRoleName = (data) => data === 0 ? '管理员' : '普通会员';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }
    componentDidMount() {
        this.setState({
            userInfo: this.props.userInfo
        })
    }
    handleChange(val, type) {
        if (type === 'status') {
            this.setState({
                userInfo: { ...this.state.userInfo, status: val ? 1 : 0 }
            })
        } else {
            this.setState({
                userInfo: { ...this.state.userInfo, is_deleted: val ? 0 : 1 }
            })
        }
    }
    handleInputChange(e, type) {
        if (type === 'name') {
            this.setState({
                userInfo: { ...this.state.userInfo, username: e.target.value }
            })
        } else {
            this.setState({
                userInfo: { ...this.state.userInfo, email: e.target.value }
            })
        }
    }
    handleSubmit = () => {
        editUser({ userInfo: this.state.userInfo }).then(res => {
            message.success('编辑成功');
        })
    }
    render() {
        return (
            <div className="account">
                <div className="account-left">
                    <p className="account-header">帐号信息</p>
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple inputClass">帐号名称</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">
                                    <Input placeholder="请输入帐号名称" value={this.state.userInfo.username} onChange={(e) => this.handleInputChange(e, 'name')} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple">角色</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">{formatterRoleName(this.state.userInfo.utype)}</div>
                            </Col>
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple inputClass">邮箱</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">
                                    <Input placeholder="请输入邮箱" value={this.state.userInfo.email} onChange={(e) => this.handleInputChange(e, 'email')} />
                                </div>
                            </Col>
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple switchClass">是否启用</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">
                                    <Switch checked={this.state.userInfo.status === 1} onChange={(val) => this.handleChange(val, 'status')} />
                                </div>
                            </Col  >
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple switchClass">是否注销</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">
                                    <Switch checked={this.state.userInfo.is_deleted === 0} onChange={(val) => this.handleChange(val, 'delete')} />
                                </div>
                            </Col  >
                        </Row>
                    </div >
                    <Button type='primary' style={{ marginTop: '10px' }} onClick={this.handleSubmit}>提交修改</Button>
                </div >
                <div className="account-right">
                    <p className="account-header">其他信息</p>
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple switchClass">头像</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">
                                    <UploadAvatar />
                                </div>
                            </Col>
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple">注册时间</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">{formatterDate(this.state.userInfo.register_time)}</div>
                            </Col>
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple">近期登陆</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">{formatterDate(this.state.userInfo.last_login_time)}</div>
                            </Col>
                        </Row>
                    </div >
                </div >
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Account);