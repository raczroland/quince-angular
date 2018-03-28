import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Person } from './models/person';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    persons$: Observable<Person[]>;

    displayModal = false;

    constructor(
        private dataService: DataService,
    ) {}

    ngOnInit() {
        this.persons$ = this.dataService.getPersons();
        this.persons$.subscribe(data =>console.log(data))
    }

    showDialog() {
        this.displayModal = true;
    }

}
