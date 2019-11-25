/*
 * @Author: xueyp
 * @Date: 2019-11-25 10:28:03
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 13:32:36
 * @description: 分步表单第一步
 */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { md5Password } from 'api/user';
import * as actionCreators from 'store/actions';

class Step1 extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.changeStep(1);
            }
        });
    };

    validateConfirmPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (!value) {
            callback('请再次输入旧密码!');
        } else if (value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            md5Password({ password: value }).then(res => {
                if (res.data.data.password !== this.props.userInfo.password) {
                    callback('密码不正确!');
                } else {
                    callback();
                }
            })
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 12,
                },
            },
        };
        return (
            <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名',
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="旧密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入旧密码',
                            }
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认旧密码" hasFeedback>
                    {getFieldDecorator('confirmPassword', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入旧密码',
                            },
                            {
                                validator: this.validateConfirmPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">下一步</Button>
                </Form.Item>
            </Form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeStep(current) {
            dispatch(actionCreators.changeStep(current));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Step1));