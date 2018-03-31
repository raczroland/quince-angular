import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { PAction } from "./action";
import { REQUEST, LOAD } from "./persons.reducer";
import { mergeMap } from "rxjs/operators/mergeMap";
import { DataService } from "../services/data.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class PersonsEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService,
    ) {}

    @Effect()
    load$ = this.actions$.pipe(
        ofType(REQUEST),
        mergeMap(action =>
            this.dataService.getPersons().pipe(
                map(data => ({type: LOAD, payload: data})),
                catchError(() => of({type: LOAD, payload: []}))
            )
        ),
    );

}