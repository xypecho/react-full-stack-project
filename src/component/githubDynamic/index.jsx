/*
 * @Author: xueyp
 * @Date: 2019-11-13 15:06:04
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-13 15:35:18
 * @description: github动态组件
 */
import React, { Fragment } from 'react';
import { getGithubCommitStatus } from 'api/spider';

export default class GithubDynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            githubCommitStatus: []
        }
    }
    componentDidMount() {
        getGithubCommitStatus().then(res => {
            this.setState({
                githubCommitStatus: res.data
            })
        })
    }
    render() {
        return (
            <Fragment>
                {
                    this.state.githubCommitStatus.map((item, key) => {
                        if (key < 6) {
                            return (
                                <div className="github-time-line-item" key={key}>
                                    <div className="github-time-line-item-left">
                                        <img src={item.author.avatar_url} alt="" height="32" />
                                    </div>
                                    <div className="github-time-line-item-right">
                                        <p><span style={{ color: 'rgb(64, 158, 255)' }}>{item.commit.committer.name}</span> 在 react-full-stack-project 提交了内容为<span style={{ color: 'rgb(64, 158, 255)' }}>{item.commit.message}</span>的更新</p>
                                        <span>{item.commit.committer.date}</span>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </Fragment>
        )
    }
};
