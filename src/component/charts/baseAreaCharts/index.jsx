/*
 * @Author: xueyp
 * @Date: 2019-11-13 16:01:24
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-13 16:12:16
 * @description: 15天内新增注册用户的图表
 */
import React from 'react';
import './index.styl';

export default class BaseAreaCharts extends React.Component {
    render() {
        return (
            <div className="baseAreaCharts">
                <div className="charts-header">
                    <span>15天内新增注册用户</span>
                </div>
                <div ref='baseAreaCharts'>
                </div>
            </div>
        )
    }
}