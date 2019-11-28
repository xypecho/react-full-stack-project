/*
 * @Author: xueyp
 * @Date: 2019-11-26 14:56:11
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 15:25:02
 * @description: 封装的头像上传组件
 */
import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            actionUrl: ''
        };
    }
    UNSAFE_componentWillMount() {
        let url = process.env.NODE_ENV === 'development'
            ? `http://localhost:8081/api/upload/image?uid=${this.props.userInfo.uid}`
            : `http://106.53.78.195:8081/api/upload/image?uid=${this.props.userInfo.uid}`;
        this.setState({
            actionUrl: url
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList, file }) => {
        this.setState({ fileList })
        if (file.status === 'done') {
            if (file.response.status === 200) {
                let avatar = `${document.location.protocol}//${file.response.data.res.substring(0, file.response.data.res.indexOf('/'))}/${file.response.data.path}`;
                let userInfo = JSON.parse(JSON.stringify(this.props.userInfo));
                userInfo.avatar = avatar;
                this.props.changeUserInfo(userInfo);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            } else {
                message.error('头像上传失败，请稍候重试');
            }
        }
    };

    beforeUpload = (file) => {
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
        const allowImage = ['GIF', 'PNG', 'JPEG', 'JPG'];
        const isImage = allowImage.indexOf(extension.toUpperCase()) === -1;
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (isImage) {
            message.warning('只能上传GIF, PNG, JPEG, JPG等格式图片');
            return false;
        }
        if (!isLt2M) {
            message.warning('上传头像图片大小不能超过1MB');
            return false;
        }
        return !isImage && isLt2M;
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={this.state.actionUrl}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    headers={
                        { "X-Requested-With": null }
                    }
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
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
        changeUserInfo(data) {
            dispatch(actionCreators.setUserInfo(data));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);