import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

let reducers = {routing: routerReducer};

reducers.doThing = (action, state) => state;

export default combineReducers(reducers);