import { AttivitaDidattica } from '../API/AttivitaDidattica';
import { catchError } from 'rxjs/operators';
import { Ordinamento } from './../API/Ordinamento';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ManifestoDegliStudi } from '../API/ManifestoDegliStudi';

@Injectable({
  providedIn: 'root'
})
export class SadService {

  private corsiDiStudioUrl = '/rest/corsiDiStudio';
  private regoleUrl = '/rest/regole';
  private insegnamentiUrl = '/rest/insegnamenti';
  private ordinamentiUrl='rest/ordinamenti';

  updateDB() : Observable<any>{
    return this.http.post(this.insegnamentiUrl,'',{responseType: 'text'})
    .pipe(catchError(this.handleError));;
  }

  getCorsiDiStudio() : Observable<any>{
    return this.http.get(this.corsiDiStudioUrl+"/ingegneria")
    .pipe(catchError(this.handleError));;
  }

  getManifestiPreview(codice: string) : Observable<any>{
    return this.http.get<number[]>(this.regoleUrl+'/'+codice)
    .pipe(catchError(this.handleError));;
  }

  addOrdinamenti(ordinamento: Ordinamento) : Observable<any>{
    return this.http.post(this.ordinamentiUrl, ordinamento, {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  getordinamentoCorrente(codice:string) : Observable<any>{
    console.log("richiesta mandata");
    return this.http.get(this.ordinamentiUrl+'/'+codice+'/ordinamentoCorrente', {responseType: 'text'})
    .pipe(catchError(this.handleError));
  }

  getInsegnamenti() : Observable<AttivitaDidattica[]>{
    return this.http.get<AttivitaDidattica[]>(this.insegnamentiUrl)
    .pipe(catchError(this.handleError));
  }

  getInsegnamentiErogatiCorsoDiStudio(codiceCorsoDiStudio : string) : Observable<AttivitaDidattica[]>{
    return this.http.get<AttivitaDidattica[]>(this.insegnamentiUrl+"/"+codiceCorsoDiStudio)
    .pipe(catchError(this.handleError));
  }

  getInsegnamentiProgrammatiCorsoDiStudio(codiceCorsoDiStudio : string) : Observable<AttivitaDidattica[]>{
    return this.http.get<AttivitaDidattica[]>(this.insegnamentiUrl+"/"+codiceCorsoDiStudio+"/programmati")
    .pipe(catchError(this.handleError));
  }

  getInsegnamentByDipartimento(dipartimento : string) : Observable<AttivitaDidattica[]>{
    return this.http.get<AttivitaDidattica[]>(this.insegnamentiUrl+"/dipartimento/"+dipartimento)
    .pipe(catchError(this.handleError));
  }

  

  addRegola(regola:ManifestoDegliStudi): Observable<string>{
    const mapSerialized = JSON.stringify(Object.fromEntries(regola.anniAccademici));
    const map = JSON.parse(mapSerialized);
    regola.anniAccademici = map;
    return this.http.post(this.regoleUrl,regola, {responseType: 'text'})
    .pipe(catchError(this.handleError));

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

constructor(private http: HttpClient) { }

}
