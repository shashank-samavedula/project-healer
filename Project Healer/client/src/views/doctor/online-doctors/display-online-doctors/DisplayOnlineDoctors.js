import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { getOnlineDoctors } from "../../../../api/api";
import { specializations } from "../../../../constants/configuration";

const showError = error => (error.length > 0 ? true : false);

class DisplayOnlineDoctors extends Component {
  state = {
    isLoading: true,
    noOfDoctors: 0,
    specializationId: "",
    specializationError: "",
    results: []
  };

  handleSpecialization = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    if (!this.state.specializationId) {
      this.setState({
        specializationError: "Select at least 1 specialization"
      });
    } else {
      this.setState({ specializationError: "" });
      this.props.history.push(
        `/online-doctors/specialization/${this.state.specializationId}`
      );
    }
  };

  handleChatNow = event => {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push({
        pathname: "/u/book-appointment",
        state: { doctorId: event.currentTarget.value }
      });
    } else {
      this.props.history.replace({
        pathname: "/u/login",
        search: `?to=${this.props.location.pathname}`
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.match.params.specializationId !==
      prevProps.match.params.specializationId
    ) {
      const results = await getOnlineDoctors(
        this.props.match.params.specializationId
      );

      this.setState({ results });
    }
  }

  async componentDidMount() {
    const results = await getOnlineDoctors(
      this.props.match.params.specializationId
    );

    this.setState({ results, isLoading: false });
  }

  render() {
    const {
      isLoading,
      specializationError,
      specializationId,
      results
    } = this.state;

    if (isLoading) {
      return (
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      );
    } else {
      return (
        <>
          <Grid container className="online-doctors-grid main" justify="center">
            <Grid item>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                className="online-doctors-grid container"
              >
                <div className="online-doctors-grid content">
                  <FormControl
                    style={{ minWidth: "247px" }}
                    required
                    error={showError(specializationError)}
                  >
                    <InputLabel htmlFor="specialization">
                      Search by Specialization
                    </InputLabel>
                    <Select
                      value={specializationId}
                      onChange={this.handleSpecialization}
                      inputProps={{
                        name: "specializationId",
                        id: "specialization"
                      }}
                    >
                      {specializations.map((specialization, index) => (
                        <MenuItem key={index} value={index.toString()}>
                          {specialization}
                        </MenuItem>
                      ))}
                    </Select>
                    <ShowErrorMessage error={specializationError} />
                  </FormControl>
                  <div className="online-doctors-grid btn">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                    >
                      Find a Doctor
                    </Button>
                  </div>
                </div>
                <Divider className="online-doctors-grid divider" />
                <Grid item>
                  <NoOfMatches
                    results={results}
                    id={this.props.match.params.specializationId}
                  />
                </Grid>
                <Divider className="online-doctors-grid divider" />
                <Grid item>
                  <ShowOnlineDoctors
                    results={results}
                    id={this.props.match.params.specializationId}
                    handleChatNow={this.handleChatNow}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }
  }
}

function ShowOnlineDoctors({ results, id, handleChatNow }) {
  const specialization = specializations[id];

  if (results === "No record found") {
    return (
      <Card className="online-doctors-grid card">
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {results}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return results.map((result, index) => (
      <Card key={index} className="online-doctors-grid card">
        <CardContent>
          <Typography variant="h5" component="h2">
            Dr. {result.firstName} {result.lastName}
          </Typography>
          <Typography color="textSecondary">{specialization}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleChatNow} value={result._id}>
            Book an Appointment
          </Button>
        </CardActions>
      </Card>
    ));
  }
}

function NoOfMatches({ results, id }) {
  const specialization = specializations[id];

  if (results === "No record found") {
    return (
      <Typography variant="h6" align="center" gutterBottom>
        0 matches found in {specialization}
      </Typography>
    );
  } else {
    return (
      <Typography variant="h6" align="center" gutterBottom>
        {results.length} matches found in {specialization}
      </Typography>
    );
  }
}

function ShowErrorMessage({ error }) {
  if (error.length > 0 && error !== "true")
    return <FormHelperText>{error}</FormHelperText>;
  else return null;
}

export default connect(state => ({ auth: state.app.login }))(
  DisplayOnlineDoctors
);
