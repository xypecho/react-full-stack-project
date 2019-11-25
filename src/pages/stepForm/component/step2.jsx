/*
 * @Author: xueyp
 * @Date: 2019-11-25 10:28:03
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 13:58:22
 * @description: 分步表单第二步
 */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { changePassword } from 'api/user';
import * as actionCreators from 'store/actions';

class Step1 extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                changePassword({ password: values.confirmPassword, uid: this.props.userInfo.uid }).then(res => {
                    message.success('密码修改成功');
                    this.props.changeStep(2);
                })
            }
        });
    };

    validateConfirmPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (!value) {
            callback('请再次输入新密码!');
        } else if (value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
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
            <Form {...formItemLayout}>
                <Form.Item label="新密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入新密码',
                            }
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认新密码" hasFeedback>
                    {getFieldDecorator('confirmPassword', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入新密码',
                            },
                            {
                                validator: this.validateConfirmPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" onClick={(e) => this.handleSubmit(e)} style={{ marginRight: '20px' }} htmlType="submit">提交</Button>
                    <Button type="default" onClick={() => this.props.changeStep(0)}>上一步</Button>
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