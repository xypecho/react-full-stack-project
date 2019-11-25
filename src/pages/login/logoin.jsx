/*
 * @Author: xueyp
 * @Date: 2019-10-24 14:33:37
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 15:28:05
 * @description: 登录的表单
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { login } from 'api/user';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '/'
        }
    }
    handleEnterEvent = () => {
        this.handleSubmit();
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values).then(res => {
                    this.props.changeUserInfo(res.data.data);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    const params = new URLSearchParams(window.location.search);
                    this.props.history.push(params.get('redirect') || '/');
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className="login-form">
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input
                        />,
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            type="password"
                            onPressEnter={() => this.handleEnterEvent()}
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                    <Button type="primary" onClick={() => this.handleSubmit()} className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfo(data) {
            dispatch(actionCreators.setUserInfo(data));
        }
    }
};
export default connect(null, mapDispatchToProps)(Form.create()(LoginForm));