import client from "../utils/client";
// import store from "../store/store";
import { specializations, ERROR, SUCCESS } from "../constants/configuration";
import { SET_ERROR, SET_SUCCESS } from "../actions/actionType";

// all the apis can be called from here

// Disease API Calls
export const getDiseaseIndex = async letter => {
  try {
    const {
      data: { results }
    } = await client().get("/disease/index", { params: { letter } });

    return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const getDiseaseInformation = async id => {
  try {
    const {
      data: { results }
    } = await client().get("/disease/information", { params: { id } });

    return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

// Doctor API Calls
export const getOnlineDoctors = async specializationId => {
  try {
    const specialization = specializations[specializationId];
    const { data } = await client().get("/doctor/online", {
      params: { specialization }
    });

    return data;
    // return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

// Article API Calls
export const getArticles = async () => {
  try {
    const {
      data: { results }
    } = await client().get("/article");

    return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const postArticle = async (
  title,
  description,
  content,
  dispatch,
  redirect,
  to
) => {
  try {
    const {
      data: { type, message }
    } = await client().post("/article", { title, description, content });
    if (type === ERROR) {
      dispatch({
        type: SET_ERROR,
        data: { type, message }
      });

      redirect("/d/login");
    } else if (type === SUCCESS) {
      dispatch({
        type: SET_SUCCESS,
        data: { type, message }
      });

      redirect(to);
    }
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

// Appointment API Calls
export const getUserAppointments = async () => {
  try {
    const {
      data: { results }
    } = await client().get("/appointment/user");

    return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const cancelUserAppointment = async (appointmentId, dispatch) => {
  try {
    const {
      data: { type, message }
    } = await client().delete("/appointment/user", {
      params: { appointmentId }
    });

    if (type === ERROR) {
      dispatch({
        type: SET_ERROR,
        data: { type, message }
      });
    } else if (type === SUCCESS) {
      dispatch({
        type: SET_SUCCESS,
        data: { type, message }
      });
    }

    return { type, message };
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const bookAppointment = async (
  appointmentFor,
  appointmentDateTime,
  description,
  firstName,
  lastName,
  relationship,
  doctorId,
  dispatch,
  redirect,
  to
) => {
  try {
    const {
      data: { type, message }
    } = await client().post("/appointment", {
      appointmentFor,
      appointmentDateTime,
      description,
      firstName,
      lastName,
      relationship,
      doctorId
    });
    if (type === ERROR) {
      dispatch({
        type: SET_ERROR,
        data: { type, message }
      });

      redirect("/u/login");
    } else if (type === SUCCESS) {
      dispatch({
        type: SET_SUCCESS,
        data: { type, message }
      });

      redirect(to);
    }
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const getDoctorAppointments = async () => {
  try {
    const {
      data: { results }
    } = await client().get("/appointment/doctor");

    return results;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const cancelDoctorAppointment = async (appointmentId, dispatch) => {
  try {
    const {
      data: { type, message }
    } = await client().delete("/appointment/doctor", {
      params: { appointmentId }
    });

    if (type === ERROR) {
      dispatch({
        type: SET_ERROR,
        data: { type, message }
      });
    } else if (type === SUCCESS) {
      dispatch({
        type: SET_SUCCESS,
        data: { type, message }
      });
    }

    return { type, message };
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const acceptDoctorAppointment = async (appointmentId, dispatch) => {
  try {
    const {
      data: { type, message }
    } = await client().post("/appointment/doctor", { appointmentId });

    if (type === ERROR) {
      dispatch({
        type: SET_ERROR,
        data: { type, message }
      });
    } else if (type === SUCCESS) {
      dispatch({
        type: SET_SUCCESS,
        data: { type, message }
      });
    }

    return { type, message };
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

// get authenticated params
const getAuthParams = (params = {}) => {
  // const state = store.getState();
  // const accessToken = selectAccessToken(state);

  return {
    params: {
      ...params
      // access_token: accessToken
    }
  };
};

// User auth routes
export const userLogin = async (username, password) => {
  try {
    const { data } = await client().post("/user/login", { username, password });
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const { data } = await client().get("/user/logout");
    getAuthParams();
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const userSignUp = async (
  username,
  password,
  firstName,
  lastName,
  email,
  avatar,
  dateOfBirth,
  gender
) => {
  try {
    const { data } = await client().post("/user/signup", {
      username,
      password,
      firstName,
      lastName,
      email,
      avatar,
      dateOfBirth,
      gender
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

// Doctor auth routes
export const doctorLogin = async (username, password) => {
  try {
    const { data } = await client().post("/doctor/login", {
      username,
      password
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const doctorLogout = async () => {
  try {
    const { data } = await client().get("/doctor/logout");
    getAuthParams();
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};

export const doctorSignUp = async (
  username,
  password,
  firstName,
  lastName,
  email,
  avatar,
  dateOfBirth,
  gender,
  specialization
) => {
  try {
    const { data } = await client().post("/doctor/signup", {
      username,
      password,
      firstName,
      lastName,
      email,
      avatar,
      dateOfBirth,
      gender,
      specialization
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    throw error;
  }
};
