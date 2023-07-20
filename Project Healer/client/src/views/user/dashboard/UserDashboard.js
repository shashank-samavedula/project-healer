import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../../authentication/user/login/Login";
import SignUp from "../../authentication/user/sign-up/SignUp";
import NotFound from "../../../commons/not-found/NotFound";
import DisplayDashboard from "./DisplayDashboard";
import Appointments from "../../appointment/user/appointments/Appointments";
import BookAppointment from "../../appointment/user/book-appointment/BookAppointment";
import { getItem } from "../../../utils/storage";
import { loginStorageKey } from "../../../constants/configuration";
import { isEmpty } from "lodash";

class UserDashboard extends Component {
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
          path={`${match.path}/appointments`}
          component={Appointments}
        />
        <PrivateRoute
          path={`${match.path}/book-appointment`}
          component={BookAppointment}
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
              pathname: "/u/login",
              search: `?to=${props.location.pathname}`
            }}
          />
        ) : auth.role === "user" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/d/dashboard" />
        )
      }
    />
  );
}

export default UserDashboard;
