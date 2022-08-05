import { SET_CURRENT_ITEM_LOADER, SET_CATEGORY_LOADER }from "../action-types/action_types";

const initialState = {
  categoryLoader: true,
  currentItemLoader: true,
};

export const loadersInfo = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_CATEGORY_LOADER:
    return {
      ...state,
      categoryLoader: payload,
    };
  case SET_CURRENT_ITEM_LOADER:
    return {
      ...state,
      currentItemLoader: payload,
    };
  default:
    return state;
  }
};
