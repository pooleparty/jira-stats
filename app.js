'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller');

const nunjucks = require('nunjucks').configure(path.join(__dirname, 'views'), {express: app});
require('nunjucks-date').install(nunjucks);

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.use(require('express-bunyan-logger')({
	name: 'jira-stats'
}));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.use('/jira', controller.jira);

app.use((err, req, res, next)=> {
	console.error(err.stack);
	res.send(err.message);
});

let port = process.env.PORT || 4000;

app.listen(port);

module.exports = app;