/*
 * @Author: xueyp
 * @Date: 2019-11-18 16:38:27
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-18 17:02:59
 * @description: 有进度条版本的文件上传
 */
import React from 'react';
import { Progress, Button, Modal } from 'antd';
import './index.styl';

const { confirm } = Modal;

export default class ProgressUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 60
        }
    }
    uploadFile() {
        confirm({
            title: '提示',
            content: '上传文件功能仅供学习交流之用，所上传的文件将在三个月之后删除。(目前只能上传图片，请不要上传奇♂怪的东西哦→_→)',
            onOk: () => {
                this.refs.uploadBtn.click();
            },
        });
    }
    confirmUpload() {
        console.log(this.refs.uploadBtn.files)
    }
    render() {
        return (
            <div className='vUpload'>
                <div className='vUpload-progress'>
                    <Progress percent={this.state.percent} status="active" />
                </div>
                <div className='vUpload-button'>
                    <Button type="primary" onClick={() => this.uploadFile()}>上传文件</Button>
                    <input
                        type='file'
                        style={{ display: 'none' }}
                        ref='uploadBtn'
                        onChange={() => this.confirmUpload()}
                        multiple='multiple'
                        accept="image/*"
                    />
                </div >
            </div >
        )
    }
}
