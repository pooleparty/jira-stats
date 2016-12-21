'use strict';

const React = require('react');
const {renderToString} = require('react-dom/server');
const {match, RouterContext} = require('react-router');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const controller = require('./controller');
const routes = require('./app/routes');

const nunjucks = require('nunjucks').configure(path.join(__dirname, 'views'), {express: app});
require('nunjucks-date').install(nunjucks);

// app.use(bodyParser.urlencoded());
app.use(express.static('public'));

// app.use(require('express-bunyan-logger')({
// 	name: 'jira-stats'
// }));

app.use('/jira', controller.jira);

app.get('*', (req, res) => {
	match(
		{routes, location: req.url},
		(err, redirectLocation, renderProps) => {
			if (err) {
				return res.status(500).send(err.message);
			}

			if (redirectLocation) {
				return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			}

			// let markup;
			// if (renderProps) {
				let markup = renderToString(<RouterContext {...renderProps}/>);
			// } else {
			// 	return res.status(404).send('Not Found');
			// }

			console.dir(`Markup: ${markup}`);

			return res.render('index.html', {markup});
		}
	)
});

// app.get('/', (req, res) => {
// 	res.render('index.html');
// });


app.use((err, req, res, next)=> {
	console.error(err.stack);
	res.send(err.message);
});

let port = process.env.PORT || 4000;

app.listen(port);

module.exports = app;