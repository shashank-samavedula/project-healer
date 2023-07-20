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
import { connect } from "react-redux";
import moment from "moment";
import {
  getUserAppointments,
  cancelUserAppointment
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
    await cancelUserAppointment(this.state.appointmentId, this.props.dispatch);

    const results = await getUserAppointments();
    this.setState({ results, open: false });
  };

  async componentDidMount() {
    const results = await getUserAppointments();

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
                            title={`Booked for ${
                              appointment.patient.firstName
                            } ${appointment.patient.lastName}`}
                            subheader={`Dr. ${appointment.doctor.firstName} ${
                              appointment.doctor.lastName
                            }`}
                          />
                          <CardContent>
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
                                Cancel
                              </Button>
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
                Are you sure you want to cancel this appointment?
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
