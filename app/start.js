'use strict';

// plain react
import React from 'react';
import {render} from 'react-dom';

// redux related
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// router related
import {Router, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import routes from './routes';

const DEFAULT_STATE = {};

import reducers from './reducers';
const store = createStore(
	reducers,
	DEFAULT_STATE,
	applyMiddleware(
		routerMiddleware(browserHistory),
		thunkMiddleware,
		createLogger()
	)
);
const history = syncHistoryWithStore(browserHistory, store);

import {AppContainer} from './components';

render(
	(
		<Provider store={store}>
			<Router history={history}>
				{routes}
			</Router>
		</Provider>
	), document.getElementById('react-root'));