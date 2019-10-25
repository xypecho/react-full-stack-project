/*
 * @Author: xueyp
 * @Date: 2019-10-25 09:28:22
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-25 10:26:28
 * @description: 封装的axios请求
 */
import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 10000
});

service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    console.log(11111111111)
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    console.log(error)
    message.error('网络异常，请稍候重试');
    return Promise.reject(error);
});

export default service;