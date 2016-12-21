import React from 'react';

export default class AppContainer extends React.Component {
	render() {
		console.log('AppContainer render');
		return (
			<div className="app-container">
				<h1>App Container</h1>
				<div className="app-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}