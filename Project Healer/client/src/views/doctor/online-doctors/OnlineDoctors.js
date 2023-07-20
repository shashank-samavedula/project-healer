import React, { Component, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import NotFound from "../../../commons/not-found/NotFound";
import DisplayOnlineDoctors from "./display-online-doctors/DisplayOnlineDoctors";
import { specializations } from "../../../constants/configuration";

export class OnlineDoctors extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={DisplayIndex} />
        <Route
          path={`${match.path}/specialization/:specializationId`}
          component={DisplayOnlineDoctors}
        />
        <Route path={`${match.path}/*`} component={NotFound} />
      </Switch>
    );
  }
}

function DisplayIndex(props) {
  const { history, match } = props;
  const [specializationId, setSpecializationId] = useState("");
  const [specializationError, setSpecializationError] = useState("");

  const showError = error => (error.length > 0 ? true : false);

  const handleSpecialization = event => {
    setSpecializationId(event.target.value);
  };

  const handleSubmit = () => {
    if (!specializationId) {
      setSpecializationError("Select at least 1 specialization");
    } else {
      setSpecializationError("");
      history.push(`${match.path}/specialization/${specializationId}`);
    }
  };

  return (
    <Grid container className="online-doctors-grid main" justify="center">
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className="online-doctors-grid container"
        >
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              Chat with Medical Experts,
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              anywhere and anytime!
            </Typography>
          </Grid>
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
                onChange={handleSpecialization}
                inputProps={{
                  name: "specialization",
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
                onClick={handleSubmit}
              >
                Find a Doctor
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

function ShowErrorMessage({ error }) {
  if (error.length > 0 && error !== "true")
    return <FormHelperText>{error}</FormHelperText>;
  else return null;
}

export default OnlineDoctors;
