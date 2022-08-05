import { combineReducers } from "redux";

import { products } from "./productsReducers";
import { loadersInfo } from "./loaders-reducers";
import { otherData } from "./other-reducers";

export const reducer = combineReducers({
  products,
  loadersInfo,
  otherData,
});

