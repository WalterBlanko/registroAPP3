import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRamosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  // Se establece la base URL del API a consumir
  apiURL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  // getPosts(): Observable<any> {
  //   return this.http.get(this.apiURL+'/ramos/').pipe(
  //     retry(3)
  //   );
  // }

  // getPost(id): Observable<any> {
  //   return this.http.get(this.apiURL+'/ramos/'+id).pipe(
  //     retry(3)
  //   );
  // }

  // createPost(post): Observable<any> {
  //   return this.http.post(this.apiURL+'ramos', post, this.httpOptions).pipe(
  //     retry(3)
  //   );
  // }

  // updatePost(id, post): Observable<any> {
  //   return this.http.put(this.apiURL+'/ramos/'+id, post, this.httpOptions).pipe(
  //     retry(3)
  //   );
  // }

  // deletePost(id): Observable<any> {
  //   return this.http.delete(this.apiURL+'/ramos/'+id, this.httpOptions)
  // }

  getAlumnos(): Observable<any> {
    return this.http.get(this.apiURL+'/estudiantes/').pipe(
      retry(3)
    );
  }
}