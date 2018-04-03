import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Person } from '../models/person'

/**
 * Service for managing the data.
 */
@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Get all persons from the JSON file.
   */
  getPersons(): Observable<Person[]> {
    // In a real-world scenario, this is where we get the data from a backend.
    // For now this is just a mock request: 
    return this.http.get('/assets/persons.json').map(data => data as Person[]);
  }

}
