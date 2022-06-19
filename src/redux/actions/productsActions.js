import { GET_ALL_PRODUCTS,SET_ALL_PRODUCTS, SET_TECH, SET_TO_CART, SET_CLOTHES, PUSH_TO_CART, REMOVE_FROM_CART, SET_TO_CART_ALREADY, INCREASE_ITEM_QTY, DECREASE_ITEM_QTY, MINUS_PRODUCT, SET_CURRENT_ITEM, SET_CURRENT_ATTRIBUTE, SET_SELECTED_ATTRIBUTE} from "../action-types/action_types";

//get all products
export const getAllProducts = () => (
    {
    type: GET_ALL_PRODUCTS,
    }
);
//set all products 
export const setAllProducts = (products) => (
    {
        type: SET_ALL_PRODUCTS,
        payload: products
    }
);
//set tech 
export const setTech = (tech) => (
    {
        type: SET_TECH,
        payload: tech,
    }
);
//set CLOTHES
export const setClothes = (clothes) => (
    {
            type: SET_CLOTHES,
            payload: clothes,
    }
);
//set CURRENT ITEM page
export const setCurrentItem = (item) => (
    {
        type: SET_CURRENT_ITEM,
        payload: item
    }
);
//set Current Attribute of  Current item
export const setCurrentAttribute = (attribute) => (
    {
        type: SET_CURRENT_ATTRIBUTE,
        payload: attribute,
    }
);

export const setSelectedAttribute = (attribute) => (
    {
        type: SET_SELECTED_ATTRIBUTE,
        payload: attribute,
    }
);

//cart action
export const pushToCart = (itemID) => {
    return {
        type: PUSH_TO_CART,
        payload: itemID,
    }
}

export const setToCart = (item) => {
    return {
        type: SET_TO_CART,
        payload: item
    }
}

export const setToCartAlready = (item) => {
    return {
        type: SET_TO_CART_ALREADY,
        payload: item,
    }
}

export const removeFromCart = (itemID) => {
    return {
        type: REMOVE_FROM_CART,
        payload: itemID
    }
}

export const minusProduct = (itemID) => {
    return {
        type: MINUS_PRODUCT,
        payload: itemID
    }
}

//qty products
export const increaseItemQty = (itemID) => {
    return {
        type: INCREASE_ITEM_QTY,
        payload: 
            itemID,
    };
};

export const decreaseItemQty = (itemID) => {
    return {
        type: DECREASE_ITEM_QTY,
        payload: itemID
    }
}

