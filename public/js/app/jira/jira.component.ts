import {Component, OnInit} from '@angular/core';
import {JiraService} from "./jira.service";
import * as _ from 'lodash';

@Component({
	selector: 'jira',
	templateUrl: 'templates/jira/jira.component.html'
})
export class JiraComponent implements OnInit {
	boards = [];

	constructor(private jiraService:JiraService) {
	}

	ngOnInit() {
		this.jiraService.getAllBoards()
			.then(boards => this.boards = boards)
			.then(() => this.sortBoards());
	}

	private sortBoards() {
		this.boards = _.sortBy(this.boards, 'name');
	}
}