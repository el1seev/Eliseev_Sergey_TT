import { takeEvery, put, select, call } from "redux-saga/effects";

import { GET_CURRENT_CATEGORY_PRODUCTS, GET_CURRENT_ITEM, PUSH_TO_CART,
  PUSH_TO_CART_PLP, SET_SELECTED_ATTRIBUTE, 
} from "../action-types/action_types";
import { setCurrentAttribute, setCurrentCategoryProducts,
  setCurrentItem, setToCart, setToCartAlready, 
} from "../actions/products-actions";
import { checkAttInCartAlready, setDefaultValues } from "../../api";
import { fetchProducts, fetchSelectedProduct } from "../../api/querys";
import { setCurrentItemLoader, setCategoryLoader } from "../actions/loaders-actions";


export function* handleCategoryProducts(categoryName){
  yield put(setCategoryLoader(true));
  const response = yield call(fetchProducts, categoryName.payload);
  if( response.data !== undefined){
    const products = response.data.category.products;
    yield put(setCurrentCategoryProducts(products));
    yield put(setCategoryLoader(response.loading));
  } else {
    yield put(setCurrentCategoryProducts(response));
    yield put(setCategoryLoader(response.loading));
  }
}

//handle current item 
export function* selectCurrentItem(itemId){
  yield put(setCurrentItemLoader(true));
  const response = yield call(fetchSelectedProduct, itemId.payload);
  if( response.data !== undefined){
    const selectedProduct = response.data.product;
    yield put(setCurrentItem(selectedProduct));
    yield put(setCurrentItemLoader(response.loading));
  } else {
    yield put(setCurrentItem(response));
    yield put(setCurrentItemLoader(response.loading));
  }
}

//work with selected attributes of current item
export function* addSelectedAttribute(attribute) {
  const current = yield select((state) => state.products.currentItem);
  current.attributes.map(item => (
    item.name === attribute.payload.name ?
      item.selected = attribute.payload.value
      :
      null
  ));
  yield put(setCurrentAttribute(current));
}

//push current item to cart 
export function* pushGoodToCart(good) {
  const cartProducts = yield select((state) => state.products.cartItems);
  const filterId = cartProducts.find(productInCart => productInCart.id === good.payload.id);
  const product = structuredClone(good.payload);

  if (filterId === undefined) {
    yield put(setToCart(product));
  } else {
    const response = checkAttInCartAlready(cartProducts, product);
    if (response === true) {
      yield put(setToCartAlready(product));
    } else {
      yield put(setToCart(product));
    }
  }
}

/*
push to cart from PLP(product list page)
  "push product to cart with default values or push product which have no attributes"
*/
export function* pushToCartFromPLP(good) {
  const cartProducts = yield select((state) => state.products.cartItems);
  const filterId = cartProducts.find(productInCart => productInCart.id === good.payload.id);
  const product = structuredClone(good.payload);
  const pushedProduct = setDefaultValues(product);
  if (filterId === undefined) {
    yield put(setToCart(pushedProduct));
  } else {
    const response = checkAttInCartAlready(cartProducts, pushedProduct);
    if (response === true) {
      yield put(setToCartAlready(pushedProduct));
    } else {
      yield put(setToCart(pushedProduct));
    }
  }
}


export function* watchProductSaga() {
  yield takeEvery(GET_CURRENT_CATEGORY_PRODUCTS, handleCategoryProducts);
  yield takeEvery(GET_CURRENT_ITEM, selectCurrentItem);
  yield takeEvery(SET_SELECTED_ATTRIBUTE, addSelectedAttribute);
  yield takeEvery(PUSH_TO_CART, pushGoodToCart);
  yield takeEvery(PUSH_TO_CART_PLP, pushToCartFromPLP);
}