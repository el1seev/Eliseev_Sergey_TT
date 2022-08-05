import { SET_CATEGORY_LOADER, SET_CURRENT_ITEM_LOADER } from "../action-types/action_types";


//set status of category loader
export const setCategoryLoader = (value) => {
  return {
    type: SET_CATEGORY_LOADER,
    payload: value,
  };
};

//SET CURRENT ITEM LOADING INFO
export const setCurrentItemLoader = (status) => {
  return {
    type: SET_CURRENT_ITEM_LOADER,
    payload: status,
  };
};
