import { GET_OTHER_DATA, SET_CATEGORIES, SET_CURRENCIES, SET_CURRENT_CURRENCY } from "../action-types/action_types";

//GET OTHER DATA: CATEGORIES AND CURRENCIES
export const getOtherData = () => (
    {
        type: GET_OTHER_DATA,
    }
);

//SET CATEGORIES AND CURRENCIES
export const setCategories = (categories) => (
    {
        type: SET_CATEGORIES,
        payload: categories,
    }
);

export const setCurrencies = (currencies) => (
    {
        type: SET_CURRENCIES,
        payload: currencies,
    }
);

//SET CURRENT CURRENCY
export const setCurrentCurrency = (currency) => (
    {
        type: SET_CURRENT_CURRENCY,
        payload: currency,
    }
);
