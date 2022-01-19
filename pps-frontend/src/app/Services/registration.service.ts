import { Student } from '../API/Student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
//http fa uso degli observable per ogni cosa
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url ='rest/register';

  register(student: Student): Observable<string>{
    return this.http.post(this.url, student, {responseType: 'text'})
    .pipe(catchError(this.handleError));
}

verifyToken(email: string, otp: string): Observable<any>{
  return this.http.post(this.url+"/"+email+"/verify",otp, {observe: 'response'})
  .pipe(catchError(this.handleError));

}

constructor(private http: HttpClient) { }

private handleError(error: HttpErrorResponse) {
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


}


