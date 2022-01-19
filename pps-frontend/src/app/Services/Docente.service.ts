import { catchError } from 'rxjs/operators';
import { PPSPreview } from './../API/PPSPreview';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
   private _ppsUrl = "/rest/pps/"


  getPPSPDF(email : string): Observable<Blob>{
         const url = this._ppsUrl + email+'/pdf';
         return this._http.get<Blob>(url, {responseType : 'blob' as 'json'});
  }

  getPPSCompleto(email:string) :Observable<any>{
    return this._http.get<PPSPreview>(this._ppsUrl+email).pipe(catchError(this._handleError));
  }

  getPPSInSospeso() :Observable<PPSPreview[]>{
    return this._http.get<PPSPreview[]>(this._ppsUrl+"inSospeso").pipe(catchError(this._handleError));
  }

  getPPSVisionati():Observable<PPSPreview[]> {
    return this._http.get<PPSPreview[]>(this._ppsUrl+"visionati").pipe(catchError(this._handleError));
  }

  approvaPPS(pps: PPSPreview): Observable<string>{
    return this._http.put(this._ppsUrl+"/"+pps.email+"/approva",null, {responseType: "text"}).pipe(catchError(this._handleError));
  }

  rifiutaPPS(pps: PPSPreview): Observable<string>{
    return this._http.put(this._ppsUrl+"/"+pps.email+"/rifiuta",null, {responseType: "text"}).pipe(catchError(this._handleError));
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



constructor(private _http : HttpClient) { }

}
