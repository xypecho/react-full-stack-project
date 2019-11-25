/*
 * @Author: xueyp
 * @Date: 2019-11-25 10:04:54
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 14:09:35
 * @description: 分步表单
 */
import React from 'react';
import { Steps } from 'antd';
import { connect } from 'react-redux';
import Step1 from 'pages/stepForm/component/step1.jsx';
import Step2 from 'pages/stepForm/component/step2.jsx';
import Step3 from 'pages/stepForm/component/step3.jsx';
import './index.styl';

const { Step } = Steps;

class StepForm extends React.Component {
    render() {
        return (
            <div className="stepForm">
                <div className="stepForm-content">
                    <Steps size="small" current={this.props.current}>
                        <Step key={'Step1'} title="验证身份" />
                        <Step key={'Step2'} title="设置新密码" />
                        <Step key={'Step3'} title="完成" />
                    </Steps>
                    <div className="stepForm-view">
                        {
                            (() => {
                                if (this.props.current === 0) {
                                    return <Step1 />
                                } else if (this.props.current === 1) {
                                    return <Step2 />
                                } else if (this.props.current === 2) {
                                    return <Step3 />
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        current: state.current
    }
}
export default connect(mapStateToProps)(StepForm);