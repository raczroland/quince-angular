import { Action } from "@ngrx/store";

export interface PAction extends Action {
    payload: any;
}