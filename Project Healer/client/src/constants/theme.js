import { amber, blue, green } from "@material-ui/core/colors";
import { ERROR, INFO, SUCCESS, WARNING } from "./configuration";

// theme constants

export const lightThemeObj = {
  palette: {
    primary: blue,
    type: "light",
    success: green[600],
    warning: amber[700]
  }
};

export const darkThemeObj = {
  palette: {
    primary: blue,
    type: "dark",
    success: green[600],
    warning: amber[700]
  }
};

export const BulbOff =
  "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z";

export const BulbOn =
  "M9,21c0,0.55 0.45,1 1,1l4,0c0.55,0 1,-0.45 1,-1l0,-1l-6,0l0,1zm3,-19c-3.86,0 -7,3.14 -7,7c0,2.38 1.19,4.47 3,5.74l0,2.26c0,0.55 0.45,1 1,1l6,0c0.55,0 1,-0.45 1,-1l0,-2.26c1.81,-1.27 3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7z";

const drawerWidth = 250;

export const headerTheme = ({ breakpoints, mixins, palette, spacing }) => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    [breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: mixins.toolbar,
  menuButton: {
    [breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawer: {
    [breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  list: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
  },
  avatarDiv: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: drawerWidth
  },
  avatarIcon: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main,
    margin: `0 ${spacing(1)}px`
  }
});

export const articlesTheme = ({ palette, spacing, transitions }) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatarIcon: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main
  }
});

export const displayDiseaseTheme = ({ palette, spacing }) => ({
  diseaseName: {
    background: palette.primary.light,
    padding: spacing(1.25)
  },
  paper: {
    background: palette.primary.light
  }
});

export const customSnackbarTheme = ({ palette, spacing }) => ({
  [ERROR]: {
    backgroundColor: palette.error.dark
  },
  [INFO]: {
    backgroundColor: palette.primary.light
  },
  [SUCCESS]: {
    backgroundColor: palette.success
  },
  [WARNING]: {
    backgroundColor: palette.warning
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});
