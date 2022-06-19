import { combineReducers } from "redux";
import { products } from "./productsReducers";
import { otherData } from "./other-reducers";

export const reducer = combineReducers({
    products,
    otherData,
});

