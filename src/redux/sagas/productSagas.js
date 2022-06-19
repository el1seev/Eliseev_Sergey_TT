import { takeEvery, put, call, takeLatest, fork, select } from "redux-saga/effects";
import { GET_ALL_PRODUCTS, PUSH_TO_CART, SET_SELECTED_ATTRIBUTE} from "../action-types/action_types";
import { fetchAllProducts } from "../../api/querys";
import { setAllProducts, setTech, setClothes, setCurrentAttribute, setToCart, setToCartAlready } from "../actions/productsActions";
import { checkAttInCartAlready, clearArray } from "../../api";

//fetch all products from graph 
export function* handleAllProducts(){
    const products = yield call(fetchAllProducts);
    const allProducts = products.data.category.products;
    const clothes = allProducts.filter( item => item.category === "clothes");
    const tech = allProducts.filter( item => item.category === "tech");
    console.log("got all products from graphql", allProducts);
    console.log("set clohtes", clothes);
    console.log("set tech", tech);
    yield put(setTech(tech));
    yield put(setAllProducts(allProducts));
    yield put(setClothes(clothes));
}
//work with selected attributes
export function* addSelectedAttribute(attribute){
    const current = yield select( (state) => state.products.currentItem);
    current.attributes.map( item => (
        item.name === attribute.payload.name ? 
        item.selected = attribute.payload.value
        :
        {}
    ))
    yield put(setCurrentAttribute(current))
}

//push current item to cart 
export function* pushGoodToCart(good){
    const cartProducts = yield select( (state) => state.products.cartItems);
    const filterId = cartProducts.find( productInCart => productInCart.id === good.payload.id);
    const product =  structuredClone(good.payload);



    if ( filterId !== undefined){
        const response = checkAttInCartAlready(cartProducts, product);
        console.log(response, "<-------------SAGA GETTED RESPONSE", response)
        if (  response === true){  
            console.log('TRUE', response)
            yield put(setToCartAlready(product))
        } else {
            console.log('FALSE', response)
            yield put(setToCart(product))
        }
    } else {
        yield put(setToCart(product))
    }
}

export function* forkProductSagas(){
    yield fork (handleAllProducts);
}

export function* watchProductSaga(){
    console.log('start watching productSagas...')
    yield takeEvery(GET_ALL_PRODUCTS, forkProductSagas);
    yield takeEvery(SET_SELECTED_ATTRIBUTE, addSelectedAttribute);
    yield takeEvery(PUSH_TO_CART, pushGoodToCart);
}