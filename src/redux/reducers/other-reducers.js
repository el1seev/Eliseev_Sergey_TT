import { SET_CART_INFO, SET_CATEGORIES, SET_CURRENCIES, SET_CURRENT_CURRENCY, SET_LOADING_STATUS } from "../action-types/action_types";


const initialState = {
    categories: [],
    currencies: [],
    currentCurrency: '$',
    cartInfo: undefined,
    loading: true,
}

export const otherData = (state = initialState, { type, payload }) => {
    switch (type) {
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
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: payload
            };
        case SET_CART_INFO:
            return {
                ...state,
                cartInfo: payload
            }
        default:
            return state;
    }
}
