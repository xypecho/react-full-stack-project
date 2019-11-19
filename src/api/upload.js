/*
 * @Author: xueyp
 * @Date: 2019-11-18 11:05:46
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-19 13:53:09
 * @description: 上传相关接口
 */
import request from 'utils/request';

// 获取上传的文件列表
export const getFilesList = (data) => request({
    url: '/api/upload/getFilesList',
    method: 'post',
    data
})

// 删除文件
export const deleteUploadList = (data) => request({
    url: '/api/upload/deleteFiles',
    method: 'post',
    data
})

// 上传文件
export const uploadFile = (data, foo) => request({
    url: '/api/upload/uploadFile',
    method: 'post',
    data,
    onUploadProgress: per => {
        return foo(per);
    }
})