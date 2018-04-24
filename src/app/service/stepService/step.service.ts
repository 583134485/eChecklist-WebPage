import { Injectable } from '@angular/core';
import { config } from '../../share/config/env.config';
import { Step } from '../../model/step';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class StepService {
  getStepListUrl = config.env + '/api/step/listall';

  addStepUrl = config.env + '/api/step/addone';

  deleteStepUrl = config.env + '/api/step/deletone';
  updateStepUrl = config.env + '/api/step/updateone';
  getStepDetailUrl = config.env + '/api/step/getdetails';

   step: Step = null;
   steps: Step[];
  constructor(
    private httpClient: HttpClient) {
  }

  deleteStep(step: Step): Observable<Object> {
    return this.httpClient.post(this.deleteStepUrl, step).pipe(
      catchError(this.handleError('getStepList', [])
      ));
  }
  getSteps(): Observable<Object> {
    // TODO: waiting for new data structure from url to design errorCode
    return this.httpClient.get(this.getStepListUrl).pipe(
      catchError(this.handleError('getStepList', [])
      ));
  }
  getStepDetail(step: Step) {
    // console.log('aaaaaaa');
    // console.log(id.toString());
    // const params = new HttpParams();
    // params.set('Id', id.toString());{ params }
    return this.httpClient.post(this.getStepDetailUrl, step).pipe(
      catchError(this.handleError('getStepList', [])
      ));
  }
  addStep(step: Step): Observable<Object> {
    console.log('add');
    return this.httpClient.post(this.addStepUrl, step, httpOptions).pipe(
      catchError(this.handleError('addStep', []))
    );

  }

  updateStep(step: Step) {
    console.log('update');
    return this.httpClient.post(this.updateStepUrl, step, httpOptions).pipe(
      catchError(this.handleError('updateStep', []))
    );

  }

  setUpdate(step: Step) {
    this.step = step;

  }
  getUpdate() {

    return this.step;

  }
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
