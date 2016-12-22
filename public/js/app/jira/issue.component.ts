import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {JiraService} from "./jira.service";
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'issue',
	templateUrl: 'templates/jira/issue.component.html'
})
export class IssueComponent implements OnInit {
	issue = {};

	constructor(private jiraService:JiraService,
				private route:ActivatedRoute) {
	}

	ngOnInit():void {
		this.route.params.switchMap((params:Params) =>
			this.jiraService.getIssue(params['issueId']))
			.subscribe(issue => this.issue = issue);
	}
}