import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {JiraService} from "./jira.service";
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'sprint',
	templateUrl: 'templates/jira/sprint.component.html'
})
export class SprintComponent implements OnInit {
	issues = [];

	constructor(private jiraService:JiraService,
				private route:ActivatedRoute) {
	}

	ngOnInit():void {
		this.route.params.switchMap((params:Params) =>
			this.jiraService.getIssuesForSprint(+params['sprintId']))
			.subscribe(issues => this.issues = issues);
	}
}