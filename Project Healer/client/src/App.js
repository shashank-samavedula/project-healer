import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import { headerTheme } from "./constants/theme";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import Header from "./commons/header/Header";
import CustomSnackbar from "./commons/custom-snackbar/CustomSnackbar";
import NotFound from "./commons/not-found/NotFound";
import HomePage from "./views/home-page/HomePage";
import UserDashboard from "./views/user/dashboard/UserDashboard";
import DoctorDashboard from "./views/doctor/dashboard/DoctorDashboard";
import DiseasesAndConditions from "./views/diseases-and-conditions/DiseasesAndConditions";
import OnlineDoctors from "./views/doctor/online-doctors/OnlineDoctors";
import Articles from "./views/article/articles/Articles";
import AboutUs from "./views/about-us/AboutUs";
import { getItem } from "./utils/storage";
import { loginStorageKey } from "./constants/configuration";
import { actionSetLogin } from "./actions/app.action";

class App extends Component {
  componentDidMount() {
    const auth = getItem(loginStorageKey);

    if (!isEmpty(auth)) {
      // set the data also on redux
      this.props.actionSetLogin(auth);
    }
  }

  render() {
    const theme = createMuiTheme(this.props.activeTheme);
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <Header />
            <div className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/u" component={UserDashboard} />
                <Route path="/d" component={DoctorDashboard} />
                <Route
                  path="/diseases-and-conditions"
                  component={DiseasesAndConditions}
                />
                <Route path="/online-doctors" component={OnlineDoctors} />
                <Route path="/articles" component={Articles} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/*" component={NotFound} />
              </Switch>
            </div>
          </div>
          <CustomSnackbar />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  ({ theme }) => ({ activeTheme: theme.activeTheme }),
  { actionSetLogin }
)(withStyles(headerTheme)(App));
