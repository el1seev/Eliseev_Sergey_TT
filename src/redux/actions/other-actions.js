import { GET_OTHER_DATA, SET_CART_INFO, SET_CATEGORIES, SET_CURRENCIES, SET_CURRENT_CURRENCY, SET_LOADING_STATUS, GET_CART_INFO }
from "../action-types/action_types";

//GET OTHER DATA: CATEGORIES AND CURRENCIES
export const getOtherData = () => {
    return {
        type: GET_OTHER_DATA,
    }
};

//SET CATEGORIES AND CURRENCIES
export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        payload: categories,
    }
};

export const setCurrencies = (currencies) => {
    return {
        type: SET_CURRENCIES,
        payload: currencies,
    }
};

//SET CURRENT CURRENCY
export const setCurrentCurrency = (currency) => {
    return {
        type: SET_CURRENT_CURRENCY,
        payload: currency,
    }
};

//SET LOADING PAGE STATUS
export const setLoadingStatus = (status) => {
    return {
        type: SET_LOADING_STATUS,
        payload: status,
    }
};

//GET AND SET CART INFO 
export const getCartInfo = () => {
    return {
        type: GET_CART_INFO,
    }
};

export const setCartInfo = (info) => {
    return {
        type: SET_CART_INFO,
        payload: info,
    }
};
