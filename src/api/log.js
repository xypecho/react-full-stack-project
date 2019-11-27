/*
 * @Author: xueyp
 * @Date: 2019-11-27 14:42:49
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-27 14:43:52
 * @description: 操作日志相关接口
 */
import request from 'utils/request';

// 获取操作日志列表
export const getOperationLogList = (data) => request({
    url: '/api/log/operationLogList',
    method: 'post',
    data
})
