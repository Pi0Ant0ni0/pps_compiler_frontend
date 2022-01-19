import { GenericUser } from './../API/GenericUser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private _adminUtentiUrl = "/rest/users/";

  deleteUtente(email: string) {
    return this._http.delete(this._adminUtentiUrl+email+"/delete",{responseType: 'text'})
    .pipe(catchError(this._handleError));
  }

  addDocenteDto(docente: any) : Observable<string>{
    return this._http.post(this._adminUtentiUrl+"docenti",docente, {responseType: 'text'})
    .pipe(catchError(this._handleError));
  }

  addSadDto(sad: any) : Observable<string>{
    return this._http.post(this._adminUtentiUrl+"sad",sad, {responseType: 'text'})
    .pipe(catchError(this._handleError));
  }

  getUtenti() : Observable<GenericUser[]>{
    return this._http.get<GenericUser[]>(this._adminUtentiUrl)
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
