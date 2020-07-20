import {initialState} from './initialState';
import { SET_FORM_RESULT} from '../actions/types';

export default (state = initialState,{type,payload})=>{
    switch(type){
        case SET_FORM_RESULT:
            return {
                ...state,
                formResults:[...state.formResults,payload]
            }
        default :
            return state
    }
}
