import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
     * Should the app show the form modal?
     */
    displayFormModal = false;

    /**
     * Should the app show the graph modal?
     */
    displayGraphModal = false;

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

    /**
     * Age intervals for the graph.
     */
    graphData = [
        { "name": "-10", "value": 0 },
        { "name": "11-20", "value": 0 },
        { "name": "21-30", "value": 0 },
        { "name": "31-40", "value": 0 },
        { "name": "41-50", "value": 0 },
        { "name": "51-", "value": 0 }
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
     * Show the form modal.
     */
    showFormModal() {
        this.displayFormModal = true;
    }

    /**
     * Calculate the graph data, then show the graph modal.
     */
    showGraphModal() {
        // Get the data:
        this.persons$.pipe(first()).subscribe(persons => {
            // These will be the intervals:
            let intervals = { "-10": 0, "11-20": 0,  "21-30": 0, "31-40": 0, "41-50": 0, "51-": 0, };
            for (let person of persons) {
                // Check the person's age and increase the corresponding interval value:
                switch (true) {
                    case (+person.age < 10): intervals["-10"]++; break;
                    case (+person.age > 11 && +person.age < 20): intervals["11-20"]++; break;
                    case (+person.age > 21 && +person.age < 30): intervals["21-30"]++; break;
                    case (+person.age > 31 && +person.age < 40): intervals["31-40"]++; break;
                    case (+person.age > 41 && +person.age < 50): intervals["41-50"]++; break;
                    case (+person.age > 51): intervals["51-"]++; break;
                    default: break;
                }
            }
            // Set the new data for the graph:
            this.graphData = [];
            for (let key in intervals) {
                if (intervals.hasOwnProperty(key)) {
                    this.graphData.push({ "name": key, "value": intervals[key] });
                }
            }
            // SHow the graph:
            this.displayGraphModal = true;
        });
    }

    /**
     * Add a person to the list.
     */
    addPerson(person: Person) {
        this.store.dispatch({type: ADD, payload: person});
        this.displayFormModal = false; // hide the modal
        this.clearFormGroup(); // clear the form for later use
    }

    /**
     * Remove a person from the list.
     */
    removePerson(person: Person) {
        this.store.dispatch({type: REMOVE, payload: person});
    }

}
