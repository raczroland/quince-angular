import { Injectable } from '@angular/core';

//import * as persons from './persons.json';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Person } from '../models/person'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getPersons(): Observable<Person[]> {
    //return Observable.of(persons as Person[]);
    return this.http.get('/assets/persons.json').map(data => data as Person[]);
  }

}
