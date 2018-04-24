import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Instance } from '../../model/instance';
import { ResultBean } from '../../model/resultBean';
import { config } from '../../share/config/env.config';
import { Params } from '@angular/router';

@Injectable()
export class InstanceService {
  getInstanceListUrl = config.env + '/api/instance/listall';

  addInstancUrl = config.env + '/api/instance/addone';

  deleteInstanceUrl = config.env + '/api/instance/deletinstance';

  updateInstanceUrl = config.env + '/api/instance/updateinstance';
  addinstanceforstepUrl = config.env + '/api/Instance/addinstanceforstep';
 getdefaultoneUrl = config.env + '/api/Wtemplate/getdefaultone';
  private instance: Instance = null;

  constructor(private httpClient: HttpClient) {

  }

  deleteInstance(instance: Instance): Observable<Object> {
    return this.httpClient.post(this.deleteInstanceUrl, instance).pipe(
      catchError(this.handleError('getInstanceList', [])
      ));
  }
  getInstances(): Observable<Object> {
    // TODO: waiting for new data structure from url to design errorCode
    // const params=new HttpParams().set('id',id);
    return this.httpClient.get(this.getInstanceListUrl).pipe(
      catchError(this.handleError('getInstanceList', [])
      ));
  }


  addInstance(instance: Instance): Observable<Object> {
    return this.httpClient.post(this.addInstancUrl, instance, httpOptions).pipe(
      catchError(this.handleError('addInstance', []))
    );

  }

  updateInstance(instance: Instance) {
    // const params = new HttpParams().set('stepId', stepId); , stepId?: string
    return this.httpClient.post(this.updateInstanceUrl, instance, httpOptions).pipe(
      catchError(this.handleError('updateInstance', []))
    );

  }
  addInstanceToStep(instance: Instance) {

    return this.httpClient.post(this.addinstanceforstepUrl, instance, httpOptions).pipe(
        catchError(this.handleError('updateInstance', []))
    );
  }
  setUpdate(instance: Instance) {
    this.instance = instance;

  }
  getUpdate() {

    return this.instance;

  }
  getDefaultInstance() {
      return this.httpClient.get(this.getdefaultoneUrl).pipe(
          catchError(this.handleError('updateInstance', []))
        );
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
