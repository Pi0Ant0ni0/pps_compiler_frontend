import { PPS } from './../API/PPS';
import { Orientamento } from 'src/app/API/Orientamento';
import { catchError } from 'rxjs/operators';
import { AttivitaDidattica } from 'src/app/API/AttivitaDidattica';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _insegnamentiUrl = "/rest/insegnamenti/";
  private _orientamentiUrl = "/rest/regole/";
  private _ppsUrl="/rest/pps";

  getInsegnamentiAScelta(coorte :number, corsoDiStudio:string) : Observable<any>{
    return this._http.get<AttivitaDidattica[]>(this._insegnamentiUrl+corsoDiStudio+"/"+coorte+"/aScelta")
    .pipe(catchError(this._handleError));
  }

  getOrientamenti(coorte :number, corsoDiStudio:string): Observable<any>{
    return this._http.get<Orientamento[]>(this._orientamentiUrl+"/"+coorte+"/"+corsoDiStudio+"/orientamenti")
    .pipe(catchError(this._handleError));
  }

  addPPS(pps:PPS): Observable<string>{
    return this._http.post(this._ppsUrl,pps,{responseType: 'text'})
    .pipe(catchError(this._handleError));
  }

  
  private _handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() =>error.error);
  }

constructor(private _http: HttpClient) { }

}
