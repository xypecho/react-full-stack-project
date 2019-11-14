/*
 * @Author: xueyp
 * @Date: 2019-11-14 17:11:13
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-14 17:39:46
 */
import { createStore, compose ,applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;