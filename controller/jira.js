const router = require('express').Router();
const bluebird = require('bluebird');
const jiraService = require('../service/jira');
const _ = require('lodash');

router.get('/board', (req, res, next) => {
	jiraService.getAllBoards().then(data => {
		if (!data) {
			console.error('Unable to get all boards');
			return res.status(500).send();
		}
		console.dir(data);
		return res.json(data.values);
	}).catch(next);
});

router.get('/board/:boardId', (req, res, next) => {
	const {boardId} = req.params;
	jiraService.getSprintsForBoard(boardId).then(data => {
		if (!data) {
			console.error(`Unable to get sprint for board ${boardId}`);
			return res.status(500).send();
		}
		console.dir(data);
		return res.json(data.values);
	}).catch(next);
});

router.get('/sprint/:sprintId/issue', (req, res, next) => {
	const {sprintId} = req.params;
	jiraService.getIssuesForSprint(sprintId).then(data => {
		if (!data) {
			console.error(`Unable to get issues for sprint ${sprintId}`);
			return res.status(500).send();
		}


		let filtered = _.filter(data.issues, (value) => {
			return _.get(value, 'fields.issuetype.subtask') != true;
		});

		let issuesWithStatuses = _.map(filtered, (value) => {
			return {
				key: value.key,
				type: _.get(value, 'fields.issuetype'),
				estimate: _.get(value, 'fields.customfield_11310'),
				status: _.get(value, 'fields.status.name'),
				statusCategory: _.get(value, 'fields.status.statusCategory.name')
			}
		});

		return res.json(issuesWithStatuses);

		// const sorted = _.sortBy(issueStatuses, ['status']);
		//
		// const ret = sorted;
		//
		// // log.info(sorted);
		//
		// // const ret = _.map(_.groupBy(sorted, 'status'), (value, key) => {
		// // 	return {
		// // 		status: key,
		// // 		total: _.sumBy(value, 'estimate')
		// // 	}
		// // });
		//
		// // log.info(_.map(_.groupBy(sorted, 'statusCategory'), (value, key) => {
		// // 	return {
		// // 		statusCategory: key,
		// // 		issues: _.groupBy(value, 'status')
		// // 	}
		// // }));
		//
		// // const ret = _.map(_.groupBy(sorted, 'statusCategory'), (value, key) => {
		// // 	return {
		// // 		status: key,
		// // 		total: _.sumBy(value, 'estimate')
		// // 	}
		// // });
	}).catch(next);
});

router.get('/issue/:issueId', (req, res, next) => {
	const {issueId} = req.params;
	jiraService.getIssue(issueId).then(issue => {
		if (!issue) {
			console.error(`Unable to get issue ${issueId}`);
			return res.status(500).send();
		}
		console.dir(issue);
		return res.json(issue);
	}).catch(next);
});

router.get('/issue/history/:issueId', (req, res, next) => {
	const {issueId} = req.params;
	jiraService.getIssueHistory(issueId).then(histories => {
		if (!histories) {
			console.error(`Unable to get history for issue ${issueId}`);
			return res.status(500).send();
		}
		console.dir(histories);
		return res.json(histories);
	}).catch(next);
});

module.exports = router;