/*
 * @Author: xueyp
 * @Date: 2019-11-18 11:05:46
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-18 11:07:35
 * @description: 上传相关接口
 */
import request from 'utils/request';

// 获取上传的文件列表
export const getFilesList = (data) => request({
    url: '/api/upload/getFilesList',
    method: 'post',
    data
})
