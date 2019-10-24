/*
 * @Author: xueyp
 * @Date: 2019-10-24 14:33:37
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-24 17:33:28
 * @description: 注册的表单
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class RegisterForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onSubmit={this.handleSubmit} className="login-form">
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
                <Form.Item label="确认密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请再次输入密码' }],
                    })(
                        <Input
                            type="password"
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{span: 18, offset: 6}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({ name: 'normal_login' })(RegisterForm);
