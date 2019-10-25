/*
 * @Author: xueyp
 * @Date: 2019-10-25 09:34:46
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-25 16:01:55
 * @description: 用户相关的接口
 */
import request from 'utils/request';

// 登录
export const login = (data) => request({
    url: '/api/user/login',
    method: 'post',
    data
})

// 注册
export const register = (data) => request({
    url: '/api/user/register',
    method: 'post',
    data
})