import { SET_CATEGORIES, SET_CURRENCIES, SET_CURRENT_CURRENCY } from "../action-types/action_types"


const initialState = {
    categories : [],
    currencies : [],
    currentCurrency: '$',
}

export const otherData = ( state = initialState, { type, payload}) => {
    switch(type){
        case SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        case SET_CURRENCIES:
            return {
                ...state,
                currencies: payload
            };
        case SET_CURRENT_CURRENCY:
            return {
                ...state,
                currentCurrency: payload
            };
        default:
            return state;
    }
}
