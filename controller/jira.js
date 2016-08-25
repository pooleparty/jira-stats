const router = require('express').Router();
const bluebird = require('bluebird');
const jiraService = require('../service/jira');
const _ = require('lodash');

router.get('/board/:boardId/sprint/:sprintId/issues', (req, res, next) => {
	const {boardId, sprintId} = req.params;
	jiraService.getIssuesForSprintBoard(boardId, sprintId).then(data => {
		if (!data) {
			console.error(`Unable to get issues for sprint 472, board 191`);
			return res.send(500);
		}

		let filtered = _.filter(data.issues, (value) => {
			return _.get(value, 'fields.issuetype.subtask') != true;
		});

		let issueStatuses = _.map(filtered, (value, index, collection) => {
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

		return res.render('jira/jira-index.html', {issues: ret});
	}).catch(next);
});

module.exports = router;