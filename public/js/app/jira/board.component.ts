import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {JiraService} from "./jira.service";
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'board',
	templateUrl: 'templates/jira/board.component.html'
})
export class BoardComponent implements OnInit {
	sprints = [];

	constructor(private jiraService:JiraService,
				private route:ActivatedRoute) {
	}

	ngOnInit():void {
		this.route.params.switchMap((params:Params) =>
			this.jiraService.getSprintsForBoard(+params['boardId']))
			.subscribe(sprints => this.sprints = sprints);
	}
}