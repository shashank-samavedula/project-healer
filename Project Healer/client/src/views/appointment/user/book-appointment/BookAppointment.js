import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { relationships } from "../../../../constants/configuration";
import { bookAppointment } from "../../../../api/api";
import { connect } from "react-redux";

const resetErrors = {
  descriptionError: "",
  firstNameError: "",
  lastNameError: "",
  relationshipError: ""
};

const showError = error => (error.length > 0 ? true : false);

class BookAppointment extends Component {
  state = {
    appointmentFor: "self",
    appointmentDateTime: new Date(),
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    description: "",
    descriptionError: "",
    relationship: "",
    relationshipError: ""
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = dateTime => {
    this.setState({ appointmentDateTime: dateTime });
  };

  handleSubmit = () => {
    const {
      appointmentFor,
      appointmentDateTime,
      description,
      firstName,
      lastName,
      relationship
    } = this.state;
    const { location, dispatch, history } = this.props;
    const to = "/u/appointments";

    // Reset all the errors
    this.setState(resetErrors);

    if (appointmentFor === "self" && description.length >= 100) {
      // call book appointment api
      bookAppointment(
        appointmentFor,
        appointmentDateTime,
        description,
        firstName,
        lastName,
        relationship,
        location.state.doctorId,
        dispatch,
        history.replace,
        to
      );
    } else if (
      appointmentFor === "someoneelse" &&
      description.length >= 100 &&
      relationship &&
      firstName &&
      lastName
    ) {
      // call book appointment api
      bookAppointment(
        appointmentFor,
        appointmentDateTime,
        description,
        firstName,
        lastName,
        relationship,
        location.state.doctorId,
        dispatch,
        history.replace,
        to
      );
    } else {
      let errorObj = {};
      if (appointmentFor === "someoneelse") {
        if (!relationship) {
          errorObj.relationshipError =
            "Select your relationship with the patient";
        }
        if (!firstName) {
          errorObj.firstNameError = "Enter patient's first name";
        }
        if (!lastName) {
          errorObj.lastNameError = "Enter patient's last name";
        }
      }
      if (!description) {
        errorObj.descriptionError = "Enter some description";
      } else if (description.length < 100) {
        errorObj.descriptionError =
          "Use 100 characters or more to describe your symptoms and conditions";
      }
      this.setState(errorObj);
    }
  };

  render() {
    const {
      appointmentFor,
      appointmentDateTime,
      description,
      descriptionError,
      relationship,
      relationshipError,
      firstName,
      firstNameError,
      lastName,
      lastNameError
    } = this.state;

    return (
      <>
        <Grid container className="book-appointment-grid main" justify="center">
          <Grid item>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              className="book-appointment-grid container"
            >
              <Grid item>
                <Typography variant="h3" align="center" gutterBottom>
                  Book Appointment
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="center" gutterBottom>
                  Describe your problem and a health specialist will get in
                  touch with you shortly!
                </Typography>
              </Grid>
              <Grid
                container
                justify="center"
                className="book-appointment-grid content"
              >
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <div className="book-appointment-grid card-content">
                        <FormControl component="fieldset" required>
                          <FormLabel component="legend">Booking for</FormLabel>
                          <RadioGroup
                            aria-label="Gender"
                            name="appointmentFor"
                            value={appointmentFor}
                            onChange={this.handleInput}
                          >
                            <FormControlLabel
                              value="self"
                              control={<Radio />}
                              label="Self"
                            />
                            <FormControlLabel
                              value="someoneelse"
                              control={<Radio />}
                              label="Someone Else"
                            />
                          </RadioGroup>
                        </FormControl>
                        {/* Only render if booked for someone else */}
                        {appointmentFor === "someoneelse" ? (
                          <>
                            <FormControl
                              // style={{ minWidth: "247px" }}
                              required
                              error={showError(relationshipError)}
                            >
                              <InputLabel htmlFor="relationship">
                                What is your relationship to the patient?
                              </InputLabel>
                              <Select
                                value={relationship}
                                onChange={this.handleInput}
                                inputProps={{
                                  name: "relationship",
                                  id: "relationship"
                                }}
                              >
                                {relationships.map((relationship, index) => (
                                  <MenuItem key={index} value={relationship}>
                                    {relationship}
                                  </MenuItem>
                                ))}
                              </Select>
                              <ShowErrorMessage error={relationshipError} />
                            </FormControl>
                            <FormControl
                              required
                              error={showError(firstNameError)}
                            >
                              <InputLabel>First Name</InputLabel>
                              <Input
                                name="firstName"
                                value={firstName}
                                onChange={this.handleInput}
                              />
                              <ShowErrorMessage error={firstNameError} />
                            </FormControl>
                            <FormControl
                              required
                              error={showError(lastNameError)}
                            >
                              <InputLabel>Last Name</InputLabel>
                              <Input
                                name="lastName"
                                value={lastName}
                                onChange={this.handleInput}
                              />
                              <ShowErrorMessage error={lastNameError} />
                            </FormControl>
                          </>
                        ) : null}
                        {/* Only render if booked for someone else */}
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            label="Preferred Date"
                            value={appointmentDateTime}
                            onChange={this.handleDateChange}
                            required
                          />
                          <KeyboardTimePicker
                            margin="normal"
                            label="Preferred Time"
                            value={appointmentDateTime}
                            onChange={this.handleDateChange}
                            required
                          />
                        </MuiPickersUtilsProvider>
                        <FormControl
                          error={showError(descriptionError)}
                          required
                        >
                          <InputLabel>Description</InputLabel>
                          <Input
                            multiline
                            name="description"
                            value={description}
                            onChange={this.handleInput}
                          />
                          <ShowErrorMessage error={descriptionError} />
                        </FormControl>
                      </div>
                    </CardContent>
                    <div className="book-appointment-grid btn">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

function ShowErrorMessage({ error }) {
  if (error.length > 0 && error !== "true")
    return <FormHelperText>{error}</FormHelperText>;
  else return null;
}

export default connect()(BookAppointment);
