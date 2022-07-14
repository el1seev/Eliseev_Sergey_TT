import { takeEvery, put, call, fork, select } from "redux-saga/effects";
import { GET_ALL_PRODUCTS, PUSH_TO_CART, PUSH_TO_CART_PLP, SET_SELECTED_ATTRIBUTE} from "../action-types/action_types";
import { fetchAllProducts } from "../../api/querys";
import { setAllProducts, setTech, setClothes, setCurrentAttribute, setToCart, setToCartAlready } from "../actions/productsActions";
import { checkAttInCartAlready, setDefaultValues } from "../../api";
import { FILTER_PARAMS } from "../../api/constans";
import { setLoadingStatus } from "../actions/other-actions";

//fetch data from graphql server 
export function* handleData(){
    const response = yield call(fetchAllProducts);
    const allProducts = response.data.category.products;
    const clothes = allProducts.filter( item => item.category === FILTER_PARAMS.CLOTHES);
    const tech = allProducts.filter( item => item.category === FILTER_PARAMS.TECH);

    yield put(setAllProducts(allProducts));
    yield put(setTech(tech));
    yield put(setClothes(clothes));
    yield put(setLoadingStatus(response.loading))
}
//work with selected attributes of current item
export function* addSelectedAttribute(attribute){
    const current = yield select( (state) => state.products.currentItem);
    current.attributes.map( item => (
        item.name === attribute.payload.name ? 
        item.selected = attribute.payload.value
        :
        null
    ))
    yield put(setCurrentAttribute(current));
}

//push current item to cart 
export function* pushGoodToCart(good){
    const cartProducts = yield select( (state) => state.products.cartItems);
    const filterId = cartProducts.find( productInCart => productInCart.id === good.payload.id);
    const product = structuredClone(good.payload);

    if ( filterId === undefined){
        yield put(setToCart(product))
    } else {
        const response = checkAttInCartAlready(cartProducts, product);
        if (  response === true){  
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
export function* pushToCartFromPLP(good){
    const cartProducts = yield select( (state) => state.products.cartItems);
    const filterId = cartProducts.find( productInCart => productInCart.id === good.payload.id);
    const product =  structuredClone(good.payload);
    const pushedProduct = setDefaultValues(product);
    if(filterId === undefined){
        yield put (setToCart(pushedProduct));
    } else {
        const response = checkAttInCartAlready(cartProducts, pushedProduct);
        if( response === true){
            yield put(setToCartAlready(pushedProduct));
        } else {
            yield put(setToCart(pushedProduct));
        }
    }
}

export function* forkProductSagas(){
    yield fork (handleData);
}


export function* watchProductSaga(){
    yield takeEvery(GET_ALL_PRODUCTS, forkProductSagas);
    yield takeEvery(SET_SELECTED_ATTRIBUTE, addSelectedAttribute);
    yield takeEvery(PUSH_TO_CART, pushGoodToCart);
    yield takeEvery(PUSH_TO_CART_PLP, pushToCartFromPLP);
}