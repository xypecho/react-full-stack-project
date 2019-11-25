/*
 * @Author: xueyp
 * @Date: 2019-11-14 17:24:25
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 13:29:55
 * @description: 定义action构造函数
 */
import actionTypes from './actionTypes';

export const setUserInfo = (userInfo) => ({
    type: actionTypes.SET_USERINFO,
    userInfo
});

export const changeStep = (current) => ({
    type: actionTypes.CHANGESTEP,
    current
});