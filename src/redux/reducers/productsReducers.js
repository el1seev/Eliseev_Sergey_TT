import { checkAttInCartAlready, compareAttributes } from "../../api";
import { SET_TECH, SET_ALL_PRODUCTS, SET_TO_CART, SET_CLOTHES, SET_CURRENT_ITEM, REMOVE_FROM_CART, SET_TO_CART_ALREADY, INCREASE_ITEM_QTY, DECREASE_ITEM_QTY, MINUS_PRODUCT, SET_CURRENT_ATTRIBUTE} from "../action-types/action_types";

const initialState = {
    all: [],
    clothes: [],
    tech: [],
    cartItems: [],
    currentItem: null
};

export const products = ( state = initialState, { type, payload}) => {
    switch(type){
        case SET_ALL_PRODUCTS: 
        return {
            ...state,
            all: payload
        };
        case SET_CLOTHES: 
            return {
                ...state,
                clothes: payload
            };
        case SET_TECH: 
            return {
                ...state,
                tech: payload
            };
            case SET_TO_CART:
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...payload , qty: 1}],
                };
            case SET_TO_CART_ALREADY:
                return {
                    ...state,
                    cartItems: 
                    state.cartItems.map(( item) => (
                        compareAttributes(item, payload) === true ?
                        {...item, qty: item.qty + 1}
                        :
                        item
                    ))
                };
            case MINUS_PRODUCT:
                return{
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                    item._id === payload._id
                    ? { ...item, qty: item.qty >= 2 ? item.qty - 1 : item.qty}
                    : item )
                }
            case REMOVE_FROM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter( (goods) => goods._id !== payload._id)
                }
            case INCREASE_ITEM_QTY: 
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item._id === payload._id
                        ? { ...item, qty: payload.qty + 1}
                        : item
                    ),
                };
            case DECREASE_ITEM_QTY: 
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item._id === payload._id
                        ? { ...item, qty: payload.qty >=2 ? payload.qty - 1 : payload.qty}
                        : item
                    ),
                };
            case SET_CURRENT_ITEM:
                return {
                    ...state,
                    currentItem: payload,
                };
            case SET_CURRENT_ATTRIBUTE:  // delete this shit and add saga that will fix this 
                
            state.currentItem.attributes.map( item => (
            item.name === payload.name ? 
            item.selected = payload.value
            // {...item, selected: payload.value}
            :
            {}
        ))
                return {
                    ...state,
                    currentItem: state.currentItem
                }
            default:
                return state;
    }
}