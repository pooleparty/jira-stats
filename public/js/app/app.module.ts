import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {JiraService} from './jira/jira.service';
import {JiraComponent} from './jira/jira.component';
import {BoardComponent} from './jira/board.component';
import {SprintComponent} from './jira/sprint.component';
import {IssueComponent} from './jira/issue.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot([
			{
				path: '',
				component: JiraComponent
			},
			{
				path: 'board/:boardId',
				component: BoardComponent
			},
			{
				path: 'sprint/:sprintId',
				component: SprintComponent
			},
			{
				path: 'issue/:issueId',
				component: IssueComponent
			}
		]),
		MaterialModule.forRoot()
	],
	declarations: [AppComponent,
		JiraComponent,
		BoardComponent,
		SprintComponent,
		IssueComponent
	],
	providers: [
		JiraService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}