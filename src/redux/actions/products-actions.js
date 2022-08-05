import {
  SET_TO_CART, PUSH_TO_CART, REMOVE_FROM_CART, SET_TO_CART_ALREADY,
  INCREASE_ITEM_QTY, DECREASE_ITEM_QTY, SET_CURRENT_ITEM, SET_CURRENT_ATTRIBUTE, SET_SELECTED_ATTRIBUTE,
  PUSH_TO_CART_PLP, CLEAR_CART, GET_CURRENT_ITEM, GET_CURRENT_CATEGORY_PRODUCTS,
  SET_CURRENT_CATEGORY_PRODUCTS,
} from "../action-types/action_types";

//get and set carent category products 
export const getCurrentCategoryProducts = (categoryName) => {
  return {
    type: GET_CURRENT_CATEGORY_PRODUCTS,
    payload: categoryName,
  };
};

export const setCurrentCategoryProducts = (items) => {
  return {
    type: SET_CURRENT_CATEGORY_PRODUCTS,
    payload: items,
  };
};

//set CURRENT ITEM page
export const getCurrentItem = (itemId) => {
  return {
    type: GET_CURRENT_ITEM,
    payload: itemId,
  };
};

export const setCurrentItem = (item) => {
  return {
    type: SET_CURRENT_ITEM,
    payload: item,
  };
};
//set Current Attribute of  Current item
export const setCurrentAttribute = (attribute) => {
  return {
    type: SET_CURRENT_ATTRIBUTE,
    payload: attribute,
  };
};

export const setSelectedAttribute = (attribute) => {
  return {
    type: SET_SELECTED_ATTRIBUTE,
    payload: attribute,
  };
};

//cart action
export const pushToCart = (item) => {
  return {
    type: PUSH_TO_CART,
    payload: item,
  };
};

export const pushToCartPLP = (item) => {
  return {
    type: PUSH_TO_CART_PLP,
    payload: item,
  };
};

export const setToCart = (item) => {
  return {
    type: SET_TO_CART,
    payload: item,
  };
};

export const setToCartAlready = (item) => {
  return {
    type: SET_TO_CART_ALREADY,
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
};

//INCREASE/DECREASE qty products
export const increaseItemQty = (item) => {
  return {
    type: INCREASE_ITEM_QTY,
    payload: item,
  };
};

export const decreaseItemQty = (item) => {
  return {
    type: DECREASE_ITEM_QTY,
    payload: item,
  };
};
//CLEAR CART 
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};