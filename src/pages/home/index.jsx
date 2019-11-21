/*
 * @Author: xueyp
 * @Date: 2019-10-25 14:17:10
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 11:13:07
 * @description: 首页
 */
import React from 'react';
import './index.styl';
import { Row, Col, Icon } from 'antd';
import { getHitokoto } from 'api/spider';
import ToDoList from 'component/toDoList/index';
import GithubDynamic from 'component/githubDynamic/index';
import BaseAreaCharts from 'component/charts/baseAreaCharts/index';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hitokoto: '',
            from: '',
            greetings: ''
        }
    }
    componentDidMount() {
        this.getHitokotoApi();
    }
    getHitokotoApi = () => {
        const currentHours = new Date().getHours();
        let greeting;
        if (currentHours < 6) {
            greeting = '快睡觉，小心猝死哦！';
        } else if (currentHours < 9) {
            greeting = '今天，又是充满希望的一天！';
        } else if (currentHours < 12) {
            greeting = '午饭吃的什么呢？';
        } else if (currentHours < 14) {
            greeting = '记得午休哦！';
        } else if (currentHours < 17) {
            greeting = '各部门注意，马上6点了！';
        } else if (currentHours < 19) {
            greeting = '吃完饭不要马上运动哦！';
        } else {
            greeting = '在加班吗？辛苦了！';
        }
        getHitokoto().then(res => {
            this.setState({
                hitokoto: res.data.hitokoto,
                from: res.data.from,
                greetings: greeting
            })
        })
    }
    render() {
        return (
            <div className="home-wrapper">
                <div className="home">
                    <a href="https://github.com/xypecho/react-full-stack-project" className="github-corner" target="_blank" rel="noopener noreferrer" aria-label="Follow me on GitHub">
                        <svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: '#409EFF', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0, cursor: 'pointer' }} aria-hidden="true">
                            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
                            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
                        </svg>
                    </a>
                    <div className="home-header">
                        <Row>
                            <Col span={24}>
                                <div className="grid-content bg-purple-dark">
                                    <p>『 {this.state.hitokoto} 』 —— 《{this.state.from}》 </p>
                                    <Icon type="redo" onClick={() => this.getHitokotoApi()} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={16}>
                                <div className="home-header-left">
                                    <div className="home-header-left-child">
                                        <span className="avatar-wrapper">
                                            <img src={this.props.userInfo.avatar} alt="" />
                                        </span>
                                    </div>
                                    <div className="home-header-left-secondChild">
                                        <div className="home-header-left-secondChild-top">
                                            {this.state.greetings}{this.props.userInfo.username}，祝你开心每一天！
                                    </div>
                                        <div className="home-header-left-secondChild-bottom">
                                            技术部 | 只会切图的切图仔
                                    </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="home-header-right">
                                    <div className="home-header-right-child">
                                        <p>任务数</p>
                                        <p>8</p>
                                    </div>
                                    <div className="home-header-right-child">
                                        <p>团队内排名</p>
                                        <p>3
                                        <span> / 8</span>
                                        </p>
                                    </div>
                                    <div className="home-header-right-child">
                                        <p>项目总数</p>
                                        <p>2</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div >
                </div>
                <div className="home-echarts">
                    <BaseAreaCharts />
                </div>
                <div className="dynamic">
                    <div className="github-time-line">
                        <div className="charts-header">
                            <span>github动态</span>
                        </div>
                        <GithubDynamic />
                    </div>
                    <div className="features-to-developed">
                        <div className="charts-header">
                            <ToDoList />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
};
export default connect(mapStateToProps, null)(Home);