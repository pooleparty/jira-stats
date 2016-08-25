const router = require('express').Router();
const bluebird = require('bluebird');
const jiraService = require('../service/jira');

router.get('/board/:boardId/sprint/:sprintId/issues', (req, res, next) => {
	const {boardId, sprintId} = req.params;
	jiraService.getIssuesForSprintBoard(boardId, sprintId).then(issues => {
		if (!issues) {
			console.error(`Unable to get issues for sprint 472, board 191`);
			return res.send(500);
		}

		issues = JSON.stringify(issues);

		return res.render('jira/jira-index.html', {issues});
	}).catch(next);
});

module.exports = router;