import { Action } from "@ngrx/store";

/**
 * Extending the built-in Action with payload.
 */
export interface ExtendedAction extends Action {
    payload: any;
}