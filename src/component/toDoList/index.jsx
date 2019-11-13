/*
 * @Author: xueyp
 * @Date: 2019-11-13 11:02:06
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-13 11:09:10
 * @description: todolist组件
 */
import React from 'react';
import { Card, Button, Icon, message } from 'antd';
import checkedImg from 'assets/images/checked.svg';
import uncheckedImg from 'assets/images/unchecked.svg';
import './index.styl';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                { name: '完成目前在写的这个项目', checked: false },
                { name: '将该项目成功部署到服务器', checked: true },
                { name: '学会react和angular', checked: false },
                {
                    name: '看完《Javascript权威指南》，话说已经很久没看了。。。',
                    checked: false
                },
                { name: '学linux', checked: false },
                { name: '工资突破10k，三线小县城能达到这水平么。。。', checked: false },
                { name: '买房买车买老婆，呸，说错了，是娶老婆', checked: false }
            ],
            newToDoList: ''
        }
    }
    handleInputChange(key) {
        const arr = this.state.todoList;
        arr[key].checked = !arr[key].checked;
        this.setState({
            todoList: arr
        })
    }
    deleteThisTodoList(key) {
        const temp_arr = this.state.todoList;
        temp_arr.splice(key, 1);
        this.setState({
            todoList: temp_arr
        })
    }
    addTodoList() {
        if (!this.state.newToDoList) {
            message.warning('不能为空哦');
            return;
        }
        this.setState({
            todoList: [...this.state.todoList, { name: this.state.newToDoList, checked: false }]
        })
        this.state.newToDoList = '';
    }
    inputTextChange(e){
        this.setState({
            newToDoList: e.target.value
        })
    }
    render() {
        return (
            <div className="toDoList">
                <Card className="box-card">
                    <div className="clearfix">
                        <input type="text" placeholder="please enter your todo list here" value={this.state.newToDoList} onChange={(e)=>this.inputTextChange(e)} />
                        <Button type="link" style={{ float: 'right', padding: '3px 0' }} onClick={() => this.addTodoList()}>新增</Button>
                    </div>
                    {
                        this.state.todoList.map((item, key) => {
                            return (
                                <div className="text item" key={key}>
                                    <input type="checkbox" name="" id="" value={item.checked} onChange={() => this.handleInputChange(key)} />
                                    <img src={item.checked ? checkedImg : uncheckedImg} alt="" height="40" />
                                    <label className={item.checked ? 'isComplete' : ''}>{item.name}</label>
                                    <Icon type="close" className="el-icon-close delete-icon" onClick={() => this.deleteThisTodoList(key)} />
                                </div>
                            )
                        })
                    }
                </Card>
            </div>
        )
    }
}