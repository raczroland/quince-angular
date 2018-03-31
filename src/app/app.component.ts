import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Person } from './models/person';
import {Observable} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ADD, REMOVE, REQUEST } from './store/persons.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AppState {
    persons: Person[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    persons$: Observable<Person[]>;

    displayModal = false;

    personForm: FormGroup;

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
        //this.persons$ = this.dataService.getPersons();
        this.store.dispatch({type: REQUEST});
        this.persons$ = this.store.pipe(select('persons'));
        this.persons$.subscribe(data =>console.log(data));
        this.clearFormGroup();
    }

    private clearFormGroup() {
        this.personForm = this.fb.group({
            name: [''],
            job: [''],
            age: [''],
            nick: [''],
            employee: [false],
        });
    }

    showDialog() {
        this.displayModal = true;
    }

    addPerson(person: Person) {
        this.store.dispatch({type: ADD, payload: person});
        this.displayModal = false;
        this.clearFormGroup();
    }

    removePerson(person: Person) {
        this.store.dispatch({type: REMOVE, payload: person});
    }

}
