import { Person } from "../models/person";
import { PAction } from "./action";

export const REMOVE= 'REMOVE';
export const ADD = 'ADD';
export const REQUEST = 'REQUEST';
export const LOAD = 'LOAD';

export function personsReducer(state: Person[], action: PAction) {
    switch (action.type) {
        case REMOVE: return state.filter(person => JSON.stringify(person) !== JSON.stringify(action.payload));
        case ADD: return [...state, action.payload];
        case LOAD: return [...action.payload];
        default: return state;
    }0
}