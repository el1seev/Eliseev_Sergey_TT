import { takeEvery, put, call, fork, select, take } from "redux-saga/effects";
import { getCartItemsInfo } from "../../api";
import { fetchOtherData } from "../../api/querys";
import { GET_CART_INFO, GET_OTHER_DATA } from "../action-types/action_types";
import { setCartInfo, setCategories, setCurrencies } from "../actions/other-actions";

export function* handleOtherData() {
    const res = yield call(fetchOtherData);
    const currencies = res.data.currencies;
    const categories = res.data.categories;

    yield put(setCurrencies(currencies));
    yield put(setCategories(categories));
}
export function* calculateCartInfo() {
    const cartItems = yield select((state) => state.products.cartItems);
    const currentCurrency = yield select((state) => state.otherData.currentCurrency);

    const result = getCartItemsInfo(cartItems, currentCurrency);
    yield put(setCartInfo(result));
}

export function* forkOtherData() {
    yield fork(handleOtherData);
}

export function* watchOtherDataSaga() {
    yield takeEvery(GET_OTHER_DATA, forkOtherData);
    yield takeEvery(GET_CART_INFO, calculateCartInfo);
}