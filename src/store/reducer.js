/*
 * @Author: xueyp
 * @Date: 2019-11-14 17:25:24
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-25 13:47:05
 * @description: 定义这个功能模块如果响应actions.js定义的动作
 */
import actionTypes from './actionTypes';

const defaultState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    current: 0
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.SET_USERINFO:
            newState.userInfo = action.userInfo;
            return newState;
        case actionTypes.CHANGESTEP:
            newState.current = action.current;
            return newState;
        default:
            return state;
    }
}