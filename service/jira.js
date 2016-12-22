'use strict';

const CONFIG = require('../config');
const bluebird = require('bluebird');
const request = bluebird.promisify(require('request'));
const _ = require('lodash');

const lib = {};

var headers = {
	"Authorization": `Basic ${process.env.BASIC_AUTH}`,
	"Content-Type": "application/json"
};

const client = opts => {
	const {url} = CONFIG.service.jira;
	const reqOpts = _.assign({}, opts);
	reqOpts.url = url + opts.url;
	reqOpts.json = true;
	_.set(reqOpts, 'headers.Authorization', `Basic ${process.env.BASIC_AUTH}`);

	console.dir(`JIRA Client requesting ${JSON.stringify(reqOpts)}`);

	return request(reqOpts)
		.then(response => {
			console.log(`JIRA responded with status ${response.statusCode}`);
			if (response.statusCode.toString()[0] !== '2') {
				return bluebird.reject(
					new Error(`non 2xx response from JIRA ${JSON.stringify(response.body)}`)
				);
			}
			return response.body;
		})
		.catch(downstreamError => {
			console.error(downstreamError.stack);
			let err;
			if (downstreamError.statusCode === 404) {
				err = new Error('not found');
				err.status = 404;
			} else {
				err = new Error('downstream JIRA error');
				err.status = 502;
			}
			return bluebird.reject(err);
		});
};

lib.getAllBoards = () => {
	console.log('getting all boards');
	return client({
		url: 'rest/agile/1.0/board?startAt=0'
	});
};

lib.getSprintsForBoard = (boardId) => {
	console.log(`getting boards ${boardId}`);
	return client({
		url: `rest/agile/1.0/board/${boardId}/sprint`
	});
};

lib.getIssuesForSprint = (sprintId) => {
	console.log(`getting issues for sprint ${sprintId}`);
	return client({
		url: `rest/agile/1.0/sprint/${sprintId}/issue`
	});
};

lib.getIssue = (issueId) => {
	console.log(`getting issue ${issueId}`);
	return client({
		url: `rest/api/latest/issue/${issueId}`
	});
};

lib.getIssueHistory = (issueId) => {
	console.log(`getting history for issue ${issueId}`);
	return client({
		url: `rest/api/latest/issue/${issueId}?expand=changelog`
	}).then(issue => issue.changelog.histories);
}

module.exports = lib;