import { Workflow } from '../../model/workflow';
import { config } from '../../share/config/env.config';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ResultBean } from '../../model/resultBean';


@Injectable()
export class WorkflowService {
  getWorkflowListUrl = config.env + '/api/workflow/listall';

  getOneWorkflowUrl = config.env + '/api/workflow/getone';
  // getWorkflowListgetOneUrl = config.env + '/api/workflow/getone';
  addWorkflowUrl = config.env + '/api/workflow/addone';

  deleteWorkflowUrl = config.env + '/api/workflow/deletone';
  updateWorkflowUrl = config.env + '/api/workflow/updateone';
  getstepsUrl = config.env + '/api/workflow/getdetails';
   workflow: Workflow = null;

  constructor(private httpClient: HttpClient) {

  }
  getstepsByworkflow(workflow: Workflow): Observable<Object> {
    console.log('happy Day');
    console.log(workflow);
    console.log('happy end');
    return this.httpClient.post(this.getstepsUrl, workflow).pipe(
      catchError(this.handleError('getWorkflow-steps', [])
      ));
  }
  deleteWorkflow(workflow: Workflow): Observable<Object> {
    return this.httpClient.post(this.deleteWorkflowUrl, workflow).pipe(
      catchError(this.handleError('getWorkflowList', [])
      ));
  }

  getOneWorkflow(workflow: Workflow): Observable<Object> {
    return this.httpClient.post(this.getOneWorkflowUrl, workflow).pipe(
      catchError(this.handleError('getWorkflowList', [])
      ));
  }

  getWorkflows(): Observable<Object> {
    // TODO: waiting for new data structure from url to design errorCode
    return this.httpClient.get(this.getWorkflowListUrl).pipe(
      catchError(this.handleError('getWorkflowList', [])
      ));
  }

  addWorkflow(workflow: Workflow): Observable<Object> {
    console.log('save workflow');
    return this.httpClient.post(this.addWorkflowUrl, workflow, httpOptions).pipe(
      catchError(this.handleError('addworkflow', []))
    );

  }

  updateWorkflow(workflow: Workflow) {
    return this.httpClient.post(this.updateWorkflowUrl, workflow, httpOptions).pipe(
      catchError(this.handleError('updateworkflow', []))
    );

  }

  setUpdate(workflow: Workflow) {
    this.workflow = workflow;

  }
  getUpdate(): Workflow {

    return this.workflow;

  }
  // setWorkflow(workflow: Workflow) {
  //   this.workflow = workflow;

  // }
  // getWorkflow() {

  //   return this.workflow;

  // }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send message to the log file
      // TODO: send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

