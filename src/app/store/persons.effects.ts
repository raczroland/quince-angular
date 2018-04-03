import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { mergeMap } from "rxjs/operators/mergeMap";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { DataService } from "../services/data.service";
import { ExtendedAction } from "./action";
import { REQUEST, LOAD } from "./persons.reducer";

/**
 * Side-effects for the store.
 */
@Injectable()
export class PersonsEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService,
    ) {}

    /**
     * We want to get the persons:
     */
    @Effect()
    load$ = this.actions$.pipe(
        ofType(REQUEST), // filter only REQUEST actions
        mergeMap(action =>
            this.dataService.getPersons().pipe(
                map(data => ({type: LOAD, payload: data})),
                catchError(() => of({type: LOAD, payload: []}))
            )
        ),
    );

}