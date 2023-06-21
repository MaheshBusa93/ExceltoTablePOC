import {createReducer,on} from '@ngrx/store'
import {getChoosenSOW} from '../actions/sow-action'
export const initialStateSow=[];
export const sowReducer=createReducer(
    initialStateSow,
    on(getChoosenSOW,(existingState,newState)=>{
        return newState; 
    })
)