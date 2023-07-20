import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import moment from "moment";
import {
  getDoctorAppointments,
  cancelDoctorAppointment,
  acceptDoctorAppointment
} from "../../../../api/api";

class Appointments extends Component {
  state = { appointmentId: "", isLoading: false, open: false, results: [] };

  handleCancelDialog = event => {
    this.setState({ open: true, appointmentId: event.currentTarget.value });
  };

  handleDialog = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleCancel = async () => {
    await cancelDoctorAppointment(
      this.state.appointmentId,
      this.props.dispatch
    );

    const results = await getDoctorAppointments();
    this.setState({ results, open: false });
  };

  handleAccept = async event => {
    await acceptDoctorAppointment(
      event.currentTarget.value,
      this.props.dispatch
    );

    const results = await getDoctorAppointments();
    this.setState({ results, open: false });
  };

  async componentDidMount() {
    const results = await getDoctorAppointments();

    this.setState({ results, isLoading: false });
  }

  render() {
    const { isLoading, open, results } = this.state;

    if (isLoading) {
      return (
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      );
    } else {
      if (results === "No record found") {
        return <Typography variant="h4">{results}</Typography>;
      } else {
        return (
          <>
            <Grid container className="appointments-grid main" justify="center">
              <Grid item xs={12}>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  direction="column"
                  className="appointments-grid container"
                >
                  <Grid item>
                    <Typography variant="h3" align="center">
                      My Appointments
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    alignItems="flex-start"
                    direction="row"
                    className="appointments-grid content"
                  >
                    {results.map((appointment, index) => (
                      <Grid key={index} xs={12} md={6} lg={4} item>
                        <Card className="appointments-grid card">
                          <CardHeader
                            title={`Booked by ${
                              appointment.bookedBy.firstName
                            } ${appointment.bookedBy.lastName}`}
                          />
                          <CardContent>
                            <Typography variant="body1" gutterBottom>
                              Patient Name: {appointment.patient.firstName}{" "}
                              {appointment.patient.lastName}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Preferred Date:{" "}
                              {moment(appointment.appointmentDateTime).format(
                                "Do MMMM YYYY"
                              )}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Preferred Time:{" "}
                              {moment(appointment.appointmentDateTime).format(
                                "h:mm A"
                              )}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Status: {appointment.status}
                            </Typography>
                            <Typography
                              variant="h5"
                              style={{ marginTop: "16px" }}
                            >
                              Description
                            </Typography>
                            <Typography
                              className="appointments-grid description"
                              paragraph
                            >
                              {appointment.description}
                            </Typography>
                          </CardContent>
                          {/* Only render buttons if appointment is not declined by the doctor */}
                          {appointment.status.toLowerCase() !== "declined" ? (
                            <div className="appointments-grid btn">
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleCancelDialog}
                                value={appointment._id}
                              >
                                Decline
                              </Button>
                              {/* Only render if booked for someone else */}
                              {appointment.status.toLowerCase() !==
                              "accepted" ? (
                                <Button
                                  variant="contained"
                                  style={{
                                    margin: "0px 16px",
                                    backgroundColor: `${green[600]}`
                                  }}
                                  onClick={this.handleAccept}
                                  value={appointment._id}
                                >
                                  Accept
                                </Button>
                              ) : null}
                              {/* Only render if booked for someone else */}
                            </div>
                          ) : null}
                          {/* Only render buttons if appointment is not declined by the doctor */}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Dialog
              open={open}
              onClose={this.handleDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to decline this appointment?
              </DialogTitle>
              <DialogActions className="appointments-dialog actions">
                <Button onClick={this.handleCancel} color="primary">
                  Yes
                </Button>
                <Button onClick={this.handleDialog} color="primary">
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      }
    }
  }
}

export default connect()(Appointments);
