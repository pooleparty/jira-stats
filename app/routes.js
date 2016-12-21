'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {AppContainer, IndexPage} from './components';

const routes = (
	<Route path="/" component={AppContainer}>
		<IndexRoute component={IndexPage}/>
	</Route>
);

export default routes;