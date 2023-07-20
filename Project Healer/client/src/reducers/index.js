import app from "./app.reducer";
import theme from "./theme.reducer";
import status from "./status.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ app, theme, status });

export default rootReducer;
