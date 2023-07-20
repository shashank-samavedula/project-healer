import {
  LOGIN,
  LOGOUT,
  SIGN_UP,
  SET_ERROR,
  SET_INFO,
  SET_SUCCESS
} from "./actionType";
import {
  userLogin,
  userSignUp,
  userLogout,
  doctorLogin,
  doctorSignUp,
  doctorLogout
} from "../api/api";
import { ERROR, SUCCESS } from "../constants/configuration";

//User auth actions
export const actionUserLogin = (
  username,
  password,
  redirect,
  to
) => async dispatch => {
  const { type, message, info, token = "" } = await userLogin(
    username,
    password
  );

  if (type === ERROR) {
    dispatch({
      type: SET_ERROR,
      data: { type, message }
    });
  } else if (type === SUCCESS) {
    dispatch({
      type: LOGIN,
      data: { token, info, role: "user" }
    });
    dispatch({
      type: SET_SUCCESS,
      data: { type, message }
    });

    redirect(to);
  }
};

export const actionUserLogout = redirect => async dispatch => {
  const data = await userLogout();

  dispatch({
    type: SET_INFO,
    data
  });
  dispatch({
    type: LOGOUT
  });

  redirect("/u/login");
};

export const actionUserSignUp = (
  username,
  password,
  firstName,
  lastName,
  email,
  avatar,
  dateOfBirth,
  gender,
  redirect,
  to
) => async dispatch => {
  const { type, message, info, token = "" } = await userSignUp(
    username,
    password,
    firstName,
    lastName,
    email,
    avatar,
    dateOfBirth,
    gender
  );

  if (type === ERROR) {
    dispatch({
      type: SET_ERROR,
      data: { type, message }
    });
  } else if (type === SUCCESS) {
    dispatch({
      type: SIGN_UP,
      data: { token, info, role: "user" }
    });
    dispatch({
      type: SET_SUCCESS,
      data: { type, message }
    });

    redirect(to);
  }
};

// Doctor auth actions
export const actionDoctorLogin = (
  username,
  password,
  redirect,
  to
) => async dispatch => {
  const { type, message, info, token = "" } = await doctorLogin(
    username,
    password
  );

  if (type === ERROR) {
    dispatch({
      type: SET_ERROR,
      data: { type, message }
    });
  } else if (type === SUCCESS) {
    dispatch({
      type: LOGIN,
      data: { token, info, role: "doctor" }
    });
    dispatch({
      type: SET_SUCCESS,
      data: { type, message }
    });

    redirect(to);
  }
};

export const actionDoctorSignUp = (
  username,
  password,
  firstName,
  lastName,
  email,
  avatar,
  dateOfBirth,
  gender,
  specialization,
  redirect,
  to
) => async dispatch => {
  const { type, message, info, token = "" } = await doctorSignUp(
    username,
    password,
    firstName,
    lastName,
    email,
    avatar,
    dateOfBirth,
    gender,
    specialization
  );

  if (type === ERROR) {
    dispatch({
      type: SET_ERROR,
      data: { type, message }
    });
  } else if (type === SUCCESS) {
    dispatch({
      type: SIGN_UP,
      data: { token, info, role: "doctor" }
    });
    dispatch({
      type: SET_SUCCESS,
      data: { type, message }
    });

    redirect(to);
  }
};

export const actionDoctorLogout = redirect => async dispatch => {
  const data = await doctorLogout();

  dispatch({
    type: SET_INFO,
    data
  });
  dispatch({
    type: LOGOUT
  });

  redirect("/d/login");
};

export const actionSetLogin = data => dispatch => {
  dispatch({
    type: LOGIN,
    data
  });
};
