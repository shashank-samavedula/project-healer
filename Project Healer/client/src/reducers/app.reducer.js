import { APP_INIT, LOGIN, LOGOUT, SIGN_UP } from "../actions/actionType";
import { setItem, removeItem } from "../utils/storage";
import { loginStorageKey } from "../constants/configuration";

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case APP_INIT:
      return { ...state };
    case LOGIN: {
      const { data } = action;
      // store it in localStorage
      setItem(loginStorageKey, data);

      return { ...state, login: { ...data } };
    }
    case LOGOUT: {
      // remove it from localStorage
      removeItem(loginStorageKey);
      return { ...state, login: {} };
    }
    case SIGN_UP: {
      const { data } = action;
      // store it in localStorage
      setItem(loginStorageKey, data);

      return { ...state, signUp: { ...data } };
    }
    default:
      return state;
  }
};

export default appReducer;
