import { darkThemeObj, BulbOn } from "../constants/theme";
import { getItem } from "../utils/storage";

let themeObj = { activeTheme: darkThemeObj, activeBulb: BulbOn };
if (getItem("theme")) {
  themeObj = getItem("theme");
}

// initial state of the redux store
const initialState = {
  app: {},
  theme: themeObj,
  status: {}
};

export default initialState;
