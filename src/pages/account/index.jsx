/*
 * @Author: xueyp
 * @Date: 2019-11-26 14:32:05
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-26 15:02:58
 * @description: 帐号设置
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Switch, Button } from 'antd';
import UploadAvatar from 'component/rUpload/rUpload/index.jsx';
import "./index.styl";

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
                                    <Input placeholder="请输入帐号名称" value={this.state.userInfo.username} />
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
                                <div className="grid-content bg-purple-light">{this.state.userInfo.utype}</div>
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
                                    <Input placeholder="请输入邮箱" value={this.state.userInfo.email} />
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
                                    <Switch defaultChecked />
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
                                    <Switch defaultChecked />
                                </div>
                            </Col  >
                        </Row>
                    </div >
                    <Button type='primary' style={{ marginTop: '10px' }}>提交修改</Button>
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
                                <div className="grid-content bg-purple-light">{this.state.userInfo.register_time}</div>
                            </Col>
                        </Row>
                    </div >
                    <div className="account-content">
                        <Row>
                            <Col span={4}>
                                <div className="grid-content bg-purple">近期登陆</div>
                            </Col>
                            <Col span={20}>
                                <div className="grid-content bg-purple-light">{this.state.userInfo.last_login_time}</div>
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