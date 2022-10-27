import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getRamos() {
    return this.http.get('assets/data/ramos.json');
  }
}
