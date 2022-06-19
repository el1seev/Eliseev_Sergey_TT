import { takeEvery, put, call, takeLatest, fork, select } from "redux-saga/effects";
import { fetchOtherData } from "../../api/querys";
import { GET_OTHER_DATA } from "../action-types/action_types";
import { setCategories, setCurrencies } from "../actions/other-actions";

export function* handleOtherData(){
    const res = yield call(fetchOtherData);
    const currencies = res.data.currencies;
    const categories = res.data.categories;

    console.log('set currencies', currencies);
    console.log('set categories', categories);

    yield put(setCurrencies(currencies))
    yield put(setCategories(categories));
}

export function* forkOtherData(){
    yield fork (handleOtherData);
}

export function* watchOtherDataSaga(){
    console.log('start watchOtherDataSagaSaga...')
    yield takeEvery(GET_OTHER_DATA, forkOtherData)
}