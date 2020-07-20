import {SET_FORM_RESULT} from './types';
export const setFormResult = (res) =>  dispatch => {
    return dispatch({
        type:SET_FORM_RESULT,
        payload: {...res}
    })
}

