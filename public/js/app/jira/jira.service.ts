import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class JiraService {
	private baseUrl = "/api/v1/jira";

	constructor(private http:Http) {
	}

	getAllBoards():Promise<any> {
		return this.http.get(`${this.baseUrl}/board`)
			.toPromise()
			.then(response => {
				console.log(response);
				return response.json();
			})
			.catch(this.handleError);
	}

	getSprintsForBoard(boardId:number):Promise<any> {
		return this.http.get(`${this.baseUrl}/board/${boardId}`)
			.toPromise()
			.then(response => {
				console.log(response);
				return response.json();
			}).catch(this.handleError);
	}

	getIssuesForSprint(sprintId:number):Promise<any> {
		return this.http.get(`${this.baseUrl}/sprint/${sprintId}/issue`)
			.toPromise()
			.then(response => {
				console.log(response);
				return response.json();
			}).catch(this.handleError);
	}

	getIssue(issueId:String):Promise<any> {
		return this.http.get(`${this.baseUrl}/issue/${issueId}`)
			.toPromise()
			.then(response => {
				console.log(response);
				return response.json();
			}).catch(this.handleError);
	}

	private handleError(error:any):Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}