import { SET_THEME } from "./actionType";

export const setTheme = theme => dispatch => {
  dispatch({
    type: SET_THEME,
    theme
  });
};
