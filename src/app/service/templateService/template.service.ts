import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { config } from '../../share/config/env.config';

@Injectable()
export class TemplateService {
  getTemplateListUrl = config.env + '/api/template/listall';

  constructor(private httpClient: HttpClient) { }

  getTemplates() {
    return this.httpClient.get(this.getTemplateListUrl).pipe(catchError(
      this.handleError('getTemplateList', [])
    ));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send message to the log file

      // TODO: send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


