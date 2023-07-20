import { SET_THEME } from "../actions/actionType";

const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, ...action.theme };
    default:
      return state;
  }
};

export default themeReducer;
