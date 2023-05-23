import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

///  RxJS imports
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

const apiRest = 'http://127.0.0.1:3000';

@Injectable({providedIn: 'root'})

export class SushiService {

  constructor(private http: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllsushis(): Observable <any> {
    return this.http.get<any> (apiRest + '/boxes').pipe(
      catchError(this.handleError)
    );
  }

  getOnesushi(id : number): Observable<any> {
    return this.http.get<any> (apiRest + '/boxes/' + id)
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: String = '';
    if (err.error instanceof Error) {
        errorMessage = `An error occurred this message : ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(() => 'Something wrong in the request, Plz Retry !');
}
}
