import { all } from "redux-saga/effects";

import { watchProductSaga } from "./productSagas";
import { watchOtherDataSaga } from "./other-sagas";
//run watchers
export default function* rootSaga() {
  yield all([watchProductSaga(), watchOtherDataSaga()]);
}
