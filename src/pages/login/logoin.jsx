/*
 * @Author: xueyp
 * @Date: 2019-10-24 14:33:37
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-25 15:53:37
 * @description: 登录的表单
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from 'api/user';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:  '/'
        }
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values).then(res => {
                    this.props.history.push('/');
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

export default Form.create()(LoginForm)