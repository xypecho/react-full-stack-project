/*
 * @Author: xueyp
 * @Date: 2019-10-25 09:28:22
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-28 09:08:26
 * @description: 封装的axios请求
 */
import axios from 'axios';
import { message } from 'antd';

const record = {};// 用来存储请求和响应的信息
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'http://106.53.78.195:8081';
const filterUrl = [`${baseURL}/api/log/insertOperationLog`, `${baseURL}/api/user/userLoginCount`, `${baseURL}/api/spider/hitokoto`, 'https://api.github.com/repos/xypecho/react-full-stack-project/commits', `${baseURL}/api/user/md5Password`, `${baseURL}/api/user/userInfo`, `${baseURL}/api/user/login`, `${baseURL}/api/user/register`]; // 不需要拦截的请求的url

const service = axios.create({
    baseURL: baseURL,
    timeout: 10000
});

service.interceptors.request.use(function (config) {
    if (filterUrl.indexOf(`${config.baseURL}${config.url}`) === -1 && filterUrl.indexOf(`${config.url}`) === -1) {
        // console.log(config);
        const { data, url } = config;
        record.request = { data, url };
    }
    // Do something before request is sent
    const { data, url } = config;
    record.request = { data, url };
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
    if (filterUrl.indexOf(response.config.url) === -1) {
        const { data, status } = response;
        const { uid, username } = JSON.parse(localStorage.getItem('userInfo'));
        record.response = { data, status };
        record.user = { uid, username };
        service.post('/api/log/insertOperationLog', { record: JSON.stringify(record) });
    }
    // Do something with response data
    const result = response.data;
    if (result.status === 201) {
        message.error(result.message);
        return Promise.reject(result);
    } else {
        return response;
    }
}, function (error) {
    // Do something with response error
    console.log(error)
    message.error('网络异常，请稍候重试');
    return Promise.reject(error);
});

export default service;