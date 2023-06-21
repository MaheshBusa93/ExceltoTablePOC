import { createSelector,createFeatureSelector } from "@ngrx/store";
export const selectSow=createSelector(
    createFeatureSelector('choosenSow'),
    (state:any)=>{
        return state;
    }
)