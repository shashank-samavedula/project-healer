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
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { connect } from "react-redux";
import { actionUserSignUp } from "../../../../actions/app.action";
import queryString from "query-string";

const resetErrors = {
  usernameError: "",
  passwordError: "",
  confirmPasswordError: "",
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  genderError: ""
};

const setErrors = {
  usernameError: "true",
  passwordError: "true",
  confirmPasswordError: "true",
  firstNameError: "true",
  lastNameError: "true",
  emailError: "true",
  genderError: "true"
};

const showError = error => (error.length > 0 ? true : false);

class SignUp extends Component {
  state = {
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    showPassword: false,
    confirmPassword: "",
    confirmPasswordError: "",
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    avatar: "",
    dateOfBirth: new Date(),
    gender: "",
    genderError: "",
    genders: ["Male", "Female", "Rather not say"]
  };

  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleDateChange = date => {
    this.setState({ dateOfBirth: date });
  };

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSignUp = () => {
    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      avatar,
      dateOfBirth,
      gender
    } = this.state;
    const { to = "/" } = queryString.parse(this.props.location.search);

    // Reset all the errors
    this.setState(resetErrors);

    if (
      username &&
      password.length >= 8 &&
      password === confirmPassword &&
      firstName &&
      lastName &&
      email &&
      gender
    ) {
      // call signup api
      this.props.actionUserSignUp(
        username,
        password,
        firstName,
        lastName,
        email,
        avatar,
        dateOfBirth,
        gender,
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
        errorObj.confirmPassword = "";
      } else if (password.length < 8) {
        errorObj.passwordError = "Use 8 characters or more for your password";
        errorObj.confirmPassword = "";
      } else if (!confirmPassword) {
        errorObj.confirmPasswordError = "Confirm your password";
      } else if (password !== confirmPassword) {
        errorObj.confirmPasswordError =
          "Those passwords didn't match. Try again.";
        errorObj.confirmPassword = "";
      }
      if (!firstName) {
        errorObj.firstNameError = "Enter first name";
      }
      if (!lastName) {
        errorObj.lastNameError = "Enter last name";
      }
      if (!email) {
        errorObj.emailError = "Enter email address";
      }
      if (!gender) {
        errorObj.genderError = "Select a gender";
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
      if (
        this.props.message ===
        "A user with the given username is already registered"
      )
        // Set username already registered error
        this.setState({ usernameError: "true" });
      else if (
        this.props.message ===
        "A user with the given email is already registered"
      ) {
        // Set email already registered error
        this.setState({ emailError: "true" });
      } else {
        // Set all the errors when unknown error
        this.setState(setErrors);
      }
    }
  }

  render() {
    const {
      username,
      usernameError,
      password,
      passwordError,
      showPassword,
      confirmPassword,
      confirmPasswordError,
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      email,
      emailError,
      avatar,
      dateOfBirth,
      gender,
      genderError,
      genders
    } = this.state;

    return (
      <Grid container className="sign-up-grid main" justify="center">
        <Grid item>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className="sign-up-grid container"
          >
            <Grid item>
              <Typography variant="h3">Sign Up</Typography>
            </Grid>
            <div className="sign-up-grid content">
              <FormControl required error={showError(firstNameError)}>
                <InputLabel>First Name</InputLabel>
                <Input
                  name="firstName"
                  value={firstName}
                  onChange={this.handleInput}
                />
                <ShowErrorMessage error={firstNameError} />
              </FormControl>
              <FormControl required error={showError(lastNameError)}>
                <InputLabel>Last Name</InputLabel>
                <Input
                  name="lastName"
                  value={lastName}
                  onChange={this.handleInput}
                />
                <ShowErrorMessage error={lastNameError} />
              </FormControl>
              <FormControl required error={showError(usernameError)}>
                <InputLabel>Username</InputLabel>
                <Input
                  name="username"
                  value={username}
                  onChange={this.handleInput}
                />
                <ShowErrorMessage error={usernameError} />
              </FormControl>
              <FormControl required error={showError(passwordError)}>
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
              <FormControl required error={showError(confirmPasswordError)}>
                <InputLabel>Confirm Password</InputLabel>
                <Input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={this.handleInput}
                />
                <ShowErrorMessage error={confirmPasswordError} />
              </FormControl>
              <FormControl>
                <InputLabel>Avatar Image URL</InputLabel>
                <Input
                  name="avatar"
                  value={avatar}
                  onChange={this.handleInput}
                />
              </FormControl>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={this.handleDateChange}
                  required
                />
              </MuiPickersUtilsProvider>
              <FormControl
                style={{ minWidth: "247px" }}
                required
                error={showError(genderError)}
              >
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={this.handleInput}
                  inputProps={{
                    name: "gender",
                    id: "gender"
                  }}
                >
                  {genders.map((gender, index) => (
                    <MenuItem key={index} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
                <ShowErrorMessage error={genderError} />
              </FormControl>
              <FormControl required error={showError(emailError)}>
                <InputLabel>Email ID</InputLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="john@doe.com"
                  onChange={this.handleInput}
                  required
                />
                <ShowErrorMessage error={emailError} />
              </FormControl>
            </div>
            <Grid item className="sign-up-grid btn">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSignUp}
              >
                Sign Up
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
  ({ status }) => ({
    openSnackbar: status.openSnackbar,
    type: status.type,
    message: status.message
  }),
  { actionUserSignUp }
)(SignUp);
