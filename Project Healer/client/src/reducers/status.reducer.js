import {
  STATUS_INIT,
  SET_ERROR,
  SET_INFO,
  SET_SUCCESS
} from "../actions/actionType";

const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_INIT: {
      return { ...state, ...action.data };
    }
    case SET_ERROR: {
      return { ...action.data, openSnackbar: true };
    }
    case SET_INFO: {
      return { ...action.data, openSnackbar: true };
    }
    case SET_SUCCESS: {
      return { ...action.data, openSnackbar: true };
    }
    default:
      return state;
  }
};

export default statusReducer;
