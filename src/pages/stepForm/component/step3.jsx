/*
 * @Author: xueyp
 * @Date: 2019-11-25 10:28:03
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 14:22:16
 * @description: 分步表单第三步
 */
import React from 'react';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

class Step3 extends React.Component {
    render() {
        return (
            <div>
                <Result
                    key={'step3'}
                    status="success"
                    title="操作成功"
                    extra={[
                        <Button type="primary" onClick={() => this.props.changeStep(0)}>
                            重新修改
                    </Button>
                    ]}
                />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeStep(current) {
            dispatch(actionCreators.changeStep(current));
        }
    }
}
export default connect(null, mapDispatchToProps)(Step3);