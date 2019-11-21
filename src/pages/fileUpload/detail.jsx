/*
 * @Author: xueyp
 * @Date: 2019-11-19 14:32:58
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 17:10:11
 * @description: 文件上传详情页
 */
import React from 'react';
import { Button } from 'antd';
import Waterfalls from 'component/waterfalls/index.jsx';
import './index.styl';

export default class FileUploadDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: ''
        }
    }
    componentDidMount() {
        this.setState({
            files: this.props.location.state.text.files
        })
    }
    render() {
        return (
            <div className="uploadFileDetail">
                <div className="back_btn">
                    <Button type="primary" onClick={this.props.history.goBack}>返回</Button>
                </div>
                <Waterfalls files={this.state.files} />
            </div >
        )
    }
}
