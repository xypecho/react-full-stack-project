/*
 * @Author: xueyp
 * @Date: 2019-10-24 14:33:37
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-14 21:01:25
 * @description: 注册的表单
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { register } from 'api/user';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

class RegisterForm extends React.Component {
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
                register(values).then(res => {
                    this.props.changeUserInfo(res.data.data);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    this.props.history.push('/');
                })
            }
        });
    };
    validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
            callback('密码最少不得少于6位数!');
        } else {
            callback();
        }
    };
    compareConfirmPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
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
                        rules: [{ required: true, message: '请输入密码' }, {
                            validator: this.validatePassword,
                        },],
                    })(
                        <Input
                            type="password"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="确认密码">
                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: '请再次输入密码' }, {
                            validator: this.compareConfirmPassword,
                        }],
                    })(
                        <Input
                            type="password"
                            onPressEnter={() => this.handleEnterEvent()}
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                    <Button type="primary" onClick={() => this.handleSubmit()} className="login-form-button">
                        注册
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
export default connect(null, mapDispatchToProps)(Form.create()(RegisterForm));