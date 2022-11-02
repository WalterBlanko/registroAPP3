import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {

  }

  async loadToken() {
    const token = await this.storage.get( TOKEN_KEY );
    if( token && token.value ) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { email; password }): Observable<any> {
    return this.http.post('http://regres.in/api/login', credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(this.storage.set( TOKEN_KEY, token ));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storage.remove( TOKEN_KEY );
  }
}