import React, { Component } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { connect } from "react-redux";
import { actionUserLogin } from "../../../../actions/app.action";
import queryString from "query-string";

const resetErrors = {
  usernameError: "",
  passwordError: ""
};

const setErrors = {
  usernameError: "true",
  passwordError: "true"
};

const showError = error => (error.length > 0 ? true : false);

class Login extends Component {
  state = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    showPassword: false
  };

  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const { to = "/" } = queryString.parse(this.props.location.search);

    // Reset all the errors
    this.setState(resetErrors);

    if (username && password) {
      // call login api
      this.props.actionUserLogin(
        username,
        password,
        this.props.history.replace,
        to
      );
    } else {
      let errorObj = {};
      if (!username) {
        errorObj.usernameError = "Enter username";
      }
      if (!password) {
        errorObj.passwordError = "Enter a password";
      }
      this.setState(errorObj);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.openSnackbar !== this.props.openSnackbar &&
      this.props.openSnackbar === true &&
      this.props.type === "ERROR"
    ) {
      // Set all the errors when unknown error
      this.setState(setErrors);
    }
  }

  render() {
    const {
      username,
      usernameError,
      password,
      passwordError,
      showPassword
    } = this.state;

    return (
      <Grid container className="login-grid main" justify="center">
        <Grid item>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className="login-grid container"
          >
            <Grid item>
              <Typography variant="h3" align="center">
                Login to your account
              </Typography>
            </Grid>
            <div className="login-grid content">
              <FormControl error={showError(usernameError)}>
                <InputLabel>Username</InputLabel>
                <Input
                  name="username"
                  value={username}
                  onChange={this.handleInput}
                />
                <ShowErrorMessage error={usernameError} />
              </FormControl>
              <FormControl error={showError(passwordError)}>
                <InputLabel>Password</InputLabel>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={this.handleInput}
                  endAdornment={
                    <ToggleShowPassword
                      show={showPassword}
                      onClick={this.handleShowPassword}
                    />
                  }
                />
                <ShowErrorMessage error={passwordError} />
              </FormControl>
            </div>
            <Grid item className="login-grid btn">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function ToggleShowPassword(props) {
  const { show, onClick } = props;
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        {show ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

function ShowErrorMessage({ error }) {
  if (error.length > 0 && error !== "true")
    return <FormHelperText>{error}</FormHelperText>;
  else return null;
}

export default connect(
  ({ status: { openSnackbar, type } }) => ({ openSnackbar, type }),
  { actionUserLogin }
)(Login);
