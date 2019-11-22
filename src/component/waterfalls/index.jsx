/*
 * @Author: xueyp
 * @Date: 2019-11-19 14:29:49
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-22 10:48:41
 * @description: 瀑布流组件
 */
import React from 'react';
import './index.styl';

export default class Waterfalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: []
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let imgList = JSON.parse(JSON.stringify(nextProps.files)).split(';');
    this.setState({
      imgList
    }, () => {
      console.log(this.state.imgList);
    })
  }
  render() {
    return (
      <h1>这是瀑布流组件哦</h1>
    )
  }
}