/*
 * @Author: xueyp
 * @Date: 2019-11-18 16:38:27
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 14:06:38
 * @description: 有进度条版本的文件上传
 */
import React from 'react';
import { Progress, Button, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { uploadFile } from 'api/upload';
import './index.styl';

const { confirm } = Modal;

class ProgressUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0
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
        if (this.refs.uploadBtn.files.length && this.refs.uploadBtn.files.length < 100) {
            const formData = new FormData();
            formData.append('username', this.props.userInfo.username);
            formData.append('uid', this.props.userInfo.uid);
            const allowType = ['image/jpeg', 'image/png', 'image/gif'];
            for (let i = 0; i < this.refs.uploadBtn.files.length; i++) {
                if (allowType.indexOf(this.refs.uploadBtn.files[i].type) !== -1) {
                    formData.append('file', this.refs.uploadBtn.files[i]);
                } else {
                    message.error('上传失败，只允许上传图片哦');
                    return;
                }
            }
            uploadFile(formData, (e) => {
                this.setState({
                    percent: Math.round((e.loaded / e.total) * 100)
                })
            }).then(() => {
                message.success('上传成功');
                this.props.successUpload();
                setTimeout(() => {
                    this.setState({
                        percent: 0
                    })
                }, 500);
            })
        } else {
            message.error('批量上传单次最多允许上传99张图片');
        }
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
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(ProgressUpload);