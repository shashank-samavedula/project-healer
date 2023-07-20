import { STATUS_INIT, SET_ERROR, SET_INFO, SET_SUCCESS } from "./actionType";

export const setStatusInit = () => dispatch => {
  dispatch({
    type: STATUS_INIT,
    data: { openSnackbar: false }
  });
};

export const setError = data => dispatch => {
  dispatch({
    type: SET_ERROR,
    data
  });
};

export const setInfo = data => dispatch => {
  dispatch({
    type: SET_INFO,
    data
  });
};

export const setSuccess = data => dispatch => {
  dispatch({
    type: SET_SUCCESS,
    data
  });
};
