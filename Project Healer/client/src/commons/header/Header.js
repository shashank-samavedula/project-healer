import React, { forwardRef, useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Home as HomePageIcon,
  Person as LoginIcon,
  PersonAdd as SignUpIcon,
  Dashboard as DashboardIcon,
  Create as PostArticleIcon,
  CalendarToday as AppointmentIcon,
  Assignment as MyAppointmentsIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon
} from "@material-ui/icons";
import {
  lightThemeObj,
  darkThemeObj,
  BulbOff,
  BulbOn,
  headerTheme
} from "../../constants/theme";
import { connect } from "react-redux";
import { actionUserLogout, actionDoctorLogout } from "../../actions/app.action";
import { setTheme } from "../../actions/theme.action";
import { isEmpty } from "lodash";
import { getItem, setItem } from "../../utils/storage";
import { loginStorageKey } from "../../constants/configuration";

const HeaderLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/" {...props} />
));

const UserLoginLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/u/login" {...props} />
));

const UserSignUpLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/u/signup" {...props} />
));

const UserDashboardLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/u/dashboard" {...props} />
));

const UserMyAppointmentsLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/u/appointments" {...props} />
));

const DoctorLoginLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/d/login" {...props} />
));

const DoctorSignUpLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/d/signup" {...props} />
));

const DoctorDashboardLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/d/dashboard" {...props} />
));

const PostArticleLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/d/post-article" {...props} />
));

const DoctorMyAppointmentsLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/d/appointments" {...props} />
));

const BookAppointmentLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/online-doctors" {...props} />
));

const UserLogoutLink = props => {
  props.actionUserLogout(props.history.replace);
};

const DoctorLogoutLink = props => {
  props.actionDoctorLogout(props.history.replace);
};

const useStyles = makeStyles(headerTheme);

function ShowDrawer(props) {
  const auth = getItem(loginStorageKey);
  const classes = useStyles();

  if (isEmpty(auth)) {
    return (
      <>
        <div className={classes.toolbar} />
        <Divider />
        <List className={classes.list}>
          <ListItem component={HeaderLink} button>
            <ListItemIcon>
              <HomePageIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
          <ListItem component={UserLoginLink} button>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem component={UserSignUpLink} button>
            <ListItemIcon>
              <SignUpIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
          <ListItem component={DoctorLoginLink} button>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Doctor" />
          </ListItem>
          <ListItem component={DoctorSignUpLink} button>
            <ListItemIcon>
              <SignUpIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up as Doctor" />
          </ListItem>
        </List>
      </>
    );
  } else if (auth.role === "user") {
    return (
      <>
        <div className={clsx(classes.toolbar, classes.avatarDiv)}>
          <Avatar className={classes.avatarIcon}>
            {auth.info.firstName.slice(0, 1)}
          </Avatar>
          <Typography variant="h6">
            {auth.info.firstName} {auth.info.lastName}
          </Typography>
        </div>
        <Divider />
        <List className={classes.list}>
          <ListItem component={HeaderLink} button>
            <ListItemIcon>
              <HomePageIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={UserDashboardLink} button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={BookAppointmentLink} button>
            <ListItemIcon>
              <AppointmentIcon />
            </ListItemIcon>
            <ListItemText primary="Book Appointment" />
          </ListItem>
          <ListItem component={UserMyAppointmentsLink} button>
            <ListItemIcon>
              <MyAppointmentsIcon />
            </ListItemIcon>
            <ListItemText primary="My Appointments" />
          </ListItem>
          <ListItem onClick={() => UserLogoutLink(props)} button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </>
    );
  } else if (auth.role === "doctor") {
    return (
      <>
        <div className={clsx(classes.toolbar, classes.avatarDiv)}>
          <Avatar className={classes.avatarIcon}>
            {auth.info.firstName.slice(0, 1)}
          </Avatar>
          <Typography variant="h6">
            Dr. {auth.info.firstName} {auth.info.lastName}
          </Typography>
        </div>
        <Divider />
        <List className={classes.list}>
          <ListItem component={HeaderLink} button>
            <ListItemIcon>
              <HomePageIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={DoctorDashboardLink} button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={DoctorMyAppointmentsLink} button>
            <ListItemIcon>
              <MyAppointmentsIcon />
            </ListItemIcon>
            <ListItemText primary="My Appointments" />
          </ListItem>
          <ListItem component={PostArticleLink} button>
            <ListItemIcon>
              <PostArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Post An Article" />
          </ListItem>
          <ListItem onClick={() => DoctorLogoutLink(props)} button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </>
    );
  }
}

function Header(props) {
  const { activeBulb, setTheme } = props;
  const [bulb, updateBulb] = useState(activeBulb);
  const [isOpen, updateMenu] = useState(false);
  const classes = useStyles();

  const toggleTheme = () => {
    updateBulb(bulb => {
      if (bulb === BulbOn) {
        setItem("theme", { activeTheme: lightThemeObj, activeBulb: BulbOff });
        setTheme({ activeTheme: lightThemeObj, activeBulb: BulbOff });
        return BulbOff;
      } else {
        setItem("theme", { activeTheme: darkThemeObj, activeBulb: BulbOn });
        setTheme({ activeTheme: darkThemeObj, activeBulb: BulbOn });
        return BulbOn;
      }
    });
  };

  const toggleMenu = () => {
    updateMenu(isOpen => !isOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            color="inherit"
            align="center"
            className={classes.title}
            noWrap
          >
            <Link component={HeaderLink} color="inherit" underline="none">
              Project Healer
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            <SvgIcon>
              <path d={bulb} />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer anchor="left" open={isOpen} onClose={toggleMenu}>
            <div onClick={toggleMenu}>
              <ShowDrawer {...props} />
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open>
            <ShowDrawer {...props} />
          </Drawer>
        </Hidden>
      </div>
    </>
  );
}

export default withRouter(
  connect(
    ({ theme: { activeBulb } }) => ({ activeBulb }),
    { actionUserLogout, actionDoctorLogout, setTheme }
  )(Header)
);
