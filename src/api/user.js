/*
 * @Author: xueyp
 * @Date: 2019-10-25 09:34:46
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 16:08:24
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

// 获取15天内新增的用户数量
export const getUserLoginCount = () => request({
    url: '/api/user/userLoginCount',
    method: 'post'
})

// md5加密密码
export const md5Password = (data) => request({
    url: '/api/user/md5Password',
    method: 'post',
    data
})

// 修改密码
export const changePassword = (data) => request({
    url: '/api/user/changePassword',
    method: 'post',
    data
})

// 获取用户列表
export const getUserList = (data) => request({
    url: '/api/user/list',
    method: 'post',
    data
})

// 删除用户
export const deleteUser = (data) => request({
    url: '/api/user/delete',
    method: 'post',
    data
})

// 修改用户信息
export const editUser = (data) => request({
    url: '/api/user/edit',
    method: 'post',
    data
})