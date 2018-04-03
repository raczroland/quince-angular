import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { DataService } from './services/data.service';
import { Person } from './models/person';
import { AppState } from './models/app-state';
import { ADD, REMOVE, REQUEST } from './store/persons.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    /**
     * Observable for the persons array.
     */
    persons$: Observable<Person[]>;

    /**
     * Should the app show the modal?
     */
    displayModal = false;

    /**
     * Form for the Add modal.
     */
    personForm: FormGroup;

    /**
     * Columns.
     */
    columns = [
        { field: 'name', header: 'Name' },
        { field: 'age', header: 'Age' },
        { field: 'nick', header: 'Nickname' },
        { field: 'employee', header: 'Employee' }
    ];

    constructor(
        private dataService: DataService,
        private store: Store<AppState>,
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        // We need data for the table:
        this.store.dispatch({type: REQUEST});
        this.persons$ = this.store.pipe(
            select('persons'),
        );
        // this.persons$.subscribe(data =>console.log(data));
        this.clearFormGroup();
    }

    /**
     * Clear the form object to get an empty form in the view.
     */
    private clearFormGroup() {
        this.personForm = this.fb.group({
            name: [''],
            job: [''],
            age: [''],
            nick: [''],
            employee: [false],
        });
    }

    /**
     * Show the modal.
     */
    showModal() {
        this.displayModal = true;
    }

    /**
     * Add a person to the list.
     */
    addPerson(person: Person) {
        this.store.dispatch({type: ADD, payload: person});
        this.displayModal = false; // hide the modal
        this.clearFormGroup(); // clear the form for later use
    }

    /**
     * Remove a person from the list.
     */
    removePerson(person: Person) {
        this.store.dispatch({type: REMOVE, payload: person});
    }

}
