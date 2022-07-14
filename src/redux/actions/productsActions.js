import {
    GET_ALL_PRODUCTS, SET_ALL_PRODUCTS, SET_TECH, SET_TO_CART, SET_CLOTHES, PUSH_TO_CART, REMOVE_FROM_CART, SET_TO_CART_ALREADY,
    INCREASE_ITEM_QTY, DECREASE_ITEM_QTY, SET_CURRENT_ITEM, SET_CURRENT_ATTRIBUTE, SET_SELECTED_ATTRIBUTE, PUSH_TO_CART_PLP, CLEAR_CART
} from "../action-types/action_types";

//get all products
export const getAllProducts = () => {
    return {
        type: GET_ALL_PRODUCTS,
    }
};
//set all products 
export const setAllProducts = (products) => {
    return {
        type: SET_ALL_PRODUCTS,
        payload: products
    }
};
//set tech 
export const setTech = (tech) => {
    return {
        type: SET_TECH,
        payload: tech,
    }
};
//set CLOTHES
export const setClothes = (clothes) => {
    return {
        type: SET_CLOTHES,
        payload: clothes,
    }
};
//set CURRENT ITEM page
export const setCurrentItem = (item) => {
    return {
        type: SET_CURRENT_ITEM,
        payload: item,
    }
};
//set Current Attribute of  Current item
export const setCurrentAttribute = (attribute) => {
    return {
        type: SET_CURRENT_ATTRIBUTE,
        payload: attribute,
    }
};

export const setSelectedAttribute = (attribute) => {
    return {
        type: SET_SELECTED_ATTRIBUTE,
        payload: attribute,
    }
};

//cart action
export const pushToCart = (item) => {
    return {
        type: PUSH_TO_CART,
        payload: item,
    }
}

export const pushToCartPLP = (item) => {
    return {
        type: PUSH_TO_CART_PLP,
        payload: item,
    }
}

export const setToCart = (item) => {
    return {
        type: SET_TO_CART,
        payload: item,
    }
}

export const setToCartAlready = (item) => {
    return {
        type: SET_TO_CART_ALREADY,
        payload: item,
    }
}

export const removeFromCart = (item) => {
    return {
        type: REMOVE_FROM_CART,
        payload: item,
    }
}

//INCREASE/DECREASE qty products
export const increaseItemQty = (item) => {
    return {
        type: INCREASE_ITEM_QTY,
        payload: item,
    }
}

export const decreaseItemQty = (item) => {
    return {
        type: DECREASE_ITEM_QTY,
        payload: item,
    }
}
//CLEAR CART 
export const clearCart = () => {
    return {
        type: CLEAR_CART,
    }
}