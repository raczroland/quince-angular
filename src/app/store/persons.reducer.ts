import { Person } from "../models/person";
import { ExtendedAction } from "./action";

//Action types:
export const REMOVE= 'REMOVE';
export const ADD = 'ADD';
export const REQUEST = 'REQUEST';
export const LOAD = 'LOAD';

/**
 * Reducer.
 * [] -> REQUEST -> (get request) -> LOAD -> [...]
 */
export function personsReducer(state: Person[], action: ExtendedAction) {
    switch (action.type) {
        case REMOVE: // remove a person from the list
            return state.filter(person => JSON.stringify(person) !== JSON.stringify(action.payload));
        case ADD: // add a person to the list
            return [...state, action.payload];
        case LOAD: // load the list
            return [...action.payload];
        default:
            return state;
    }
}