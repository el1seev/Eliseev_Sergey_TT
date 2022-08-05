import { compareAttributes } from "../../api";
import {
  SET_TO_CART, SET_CURRENT_ITEM, REMOVE_FROM_CART, SET_TO_CART_ALREADY, INCREASE_ITEM_QTY,
  DECREASE_ITEM_QTY, SET_CURRENT_ATTRIBUTE, CLEAR_CART, SET_CURRENT_CATEGORY_PRODUCTS,
}
  from "../action-types/action_types";

const initialState = {
  currentCategoryProducts: null,
  currentItem: null,
  cartItems: [],
};

export const products = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_CURRENT_CATEGORY_PRODUCTS:
    return {
      ...state,
      currentCategoryProducts: payload,
    };
  case SET_CURRENT_ITEM:
    return {
      ...state,
      currentItem: payload,
    };
  case SET_CURRENT_ATTRIBUTE:
    state.currentItem.attributes.map(item => (
      item.name === payload.name ?
        item.selected = payload.value
        :
        null
    ));
    return {
      ...state,
      currentItem: state.currentItem,
    };
  case SET_TO_CART:
    return {
      ...state,
      cartItems: [...state.cartItems, { ...payload, qty: 1 }],
    };
  case SET_TO_CART_ALREADY:
    return {
      ...state,
      cartItems:
        state.cartItems.map((item) =>
          compareAttributes(item, payload) === true 
            ?
            { ...item, qty: item.qty + 1 }
            :
            item
        ),
    };
  case INCREASE_ITEM_QTY:
    return {
      ...state,
      cartItems:
        state.cartItems.map((item) =>
          compareAttributes(item, payload) === true 
            ?
            { ...item, qty: item.qty + 1 }
            :
            item
        ),
    };
  case REMOVE_FROM_CART:
    return {
      ...state,
      cartItems:
        state.cartItems.filter((item) =>
          compareAttributes(item, payload) !== true
        ),
    };
  case DECREASE_ITEM_QTY:
    return {
      ...state,
      cartItems:
        state.cartItems.map((item) =>
          compareAttributes(item, payload) === true 
            ?
            { ...item, qty: item.qty >= 2 ? item.qty - 1 : item.qty }
            :
            item
        ),
    };
  case CLEAR_CART:
    return {
      ...state,
      cartItems: [],
    };
  default:
    return state;
  }
};