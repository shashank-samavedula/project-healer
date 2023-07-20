import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../../authentication/doctor/login/Login";
import SignUp from "../../authentication/doctor/sign-up/SignUp";
import NotFound from "../../../commons/not-found/NotFound";
import DisplayDashboard from "./DisplayDashboard";
import PostArticle from "../../article/post-article/PostArticle";
import Appointments from "../../appointment/doctor/appointments/Appointments";
import { getItem } from "../../../utils/storage";
import { loginStorageKey } from "../../../constants/configuration";
import { isEmpty } from "lodash";

class DoctorDashboard extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Redirect exact from={`${match.path}`} to={`${match.path}/login`} />
        <Route path={`${match.path}/login`} component={Login} />
        <Route path={`${match.path}/signup`} component={SignUp} />
        <PrivateRoute
          path={`${match.path}/dashboard`}
          component={DisplayDashboard}
        />
        <PrivateRoute
          path={`${match.path}/post-article`}
          component={PostArticle}
        />
        <PrivateRoute
          path={`${match.path}/appointments`}
          component={Appointments}
        />
        <Route path={`${match.path}/*`} component={NotFound} />
      </Switch>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  const auth = getItem(loginStorageKey);

  return (
    <Route
      {...rest}
      render={props =>
        isEmpty(auth) ? (
          <Redirect
            to={{
              pathname: "/d/login",
              search: `?to=${props.location.pathname}`
            }}
          />
        ) : auth.role === "doctor" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/u/dashboard" />
        )
      }
    />
  );
}

export default DoctorDashboard;
