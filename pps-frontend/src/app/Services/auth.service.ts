import { User } from './../API/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
//http fa uso degli observable per ogni cosa
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url :string = "/rest/auth"
  private email: string="";

  isLogged():boolean{
    return (this.getUser() != null) && (this.getToken!=null);
  }


  getUser() : User{
    const user :User = JSON.parse(localStorage.getItem('user')!);
    return user; 
  }

  setUser(user : User) {
    localStorage.setItem('user',JSON.stringify(user));
  }


  login(email: string): Observable<string>{
      return this.http.post(this.url, email, {responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  verifyToken(email: string, otp: string): Observable<any>{
    return this.http.post(this.url+"/"+email+"/verify",otp, {observe: 'response'})
    .pipe(catchError(this.handleError));

  }


  logout():void{
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.email="";
      this.route.navigate(['login']);
  }

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

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }


constructor(private http: HttpClient, private route: Router) { }

}
