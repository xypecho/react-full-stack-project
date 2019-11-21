/*
 * @Author: xueyp
 * @Date: 2019-11-13 16:01:24
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 10:54:51
 * @description: 15天内新增注册用户的图表
 */
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { getUserLoginCount } from 'api/user';
import Tools from 'utils/tools.js';
import './index.styl';

const _Tools = new Tools();

export default class BaseAreaCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }
    UNSAFE_componentWillMount() {
        getUserLoginCount().then(res => {
            _Tools.formatterChartsData(res.data);
            this.setState({
                tableData: _Tools.formatterChartsData(res.data)
            })
        })
    }
    render() {
        return (
            <div className="baseAreaCharts">
                <div className="charts-header">
                    <span>15天内新增注册用户</span>
                </div>
                <ResponsiveContainer width='100%' height={330}>
                    <LineChart
                        data={this.state.tableData}
                        syncId="anyId"
                        margin={{
                            top: 30, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}