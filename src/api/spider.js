/*
 * @Author: xueyp
 * @Date: 2019-11-13 10:04:58
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-13 10:06:13
 * @description: 爬虫相关的接口
 */
import request from 'utils/request';

// 获取一言语句
export const getHitokoto = () => request({
    url: '/api/spider/hitokoto',
    method: 'post'
})