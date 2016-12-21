const router = require('express').Router();
const bluebird = require('bluebird');
const jiraService = require('../service/jira');
const _ = require('lodash');

router.get('/', (req, res, next) => {
	res.render('jira/jira-index.html');
});

router.get('/board', (req, res, next) => {
	jiraService.getAllBoards().then(boards => {
		if (!boards) {
			console.error('Unable to get all boards');
			return res.send(500);
		}
		console.dir(boards);
		return res.render('jira/board.html', {boards});
	}).catch(next);
});

router.get('/board/:boardId', (req, res, next) => {
	const {boardId} = req.params;
	jiraService.getSprintsForBoard(boardId).then(sprints => {
		if (!sprints) {
			console.error(`Unable to get sprint for board ${boardId}`);
			return res.send(500);
		}
		console.dir(sprints);
		return res.render('jira/sprint.html', {sprints});
	}).catch(next);
});

router.get('/sprint/:sprintId/issue', (req, res, next) => {
	const {sprintId} = req.params;
	jiraService.getIssuesForSprint(sprintId).then(issues => {
		if (!issues) {
			console.error(`Unable to get issues for sprint ${sprintId}`);
			return res.send(500);
		}

		let filtered = _.filter(issues, value => _.get(value, 'fields.issuetype.subtask') != true);

		let issueStatuses = _.map(filtered, value => {
			return {
				key: value.key,
				estimate: _.get(value, 'fields.customfield_11310'),
				status: _.get(value, 'fields.status.name'),
				statusCategory: _.get(value, 'fields.status.statusCategory.name')
			}
		});

		const sorted = _.sortBy(issueStatuses, ['status']);

		const ret = sorted;

		// log.info(sorted);

		// const ret = _.map(_.groupBy(sorted, 'status'), (value, key) => {
		// 	return {
		// 		status: key,
		// 		total: _.sumBy(value, 'estimate')
		// 	}
		// });

		// log.info(_.map(_.groupBy(sorted, 'statusCategory'), (value, key) => {
		// 	return {
		// 		statusCategory: key,
		// 		issues: _.groupBy(value, 'status')
		// 	}
		// }));

		// const ret = _.map(_.groupBy(sorted, 'statusCategory'), (value, key) => {
		// 	return {
		// 		status: key,
		// 		total: _.sumBy(value, 'estimate')
		// 	}
		// });

		return res.render('jira/issue.html', {issues: ret});
	}).catch(next);
});

router.get('/issue/history/:issueId', (req, res, next) => {
	const {issueId} = req.params;
	jiraService.getIssueHistory(issueId).then(histories => {
		if (!histories) {
			console.error(`Unable to get history for issue ${issueId}`);
			return res.send(500);
		}
		console.dir(histories);
		return res.render('jira/issue-history.html', {histories});
	}).catch(next);
});

module.exports = router;