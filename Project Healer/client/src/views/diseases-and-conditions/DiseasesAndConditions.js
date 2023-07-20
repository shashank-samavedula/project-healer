import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Fab, Grid, Typography } from "@material-ui/core";
import NotFound from "../../commons/not-found/NotFound";
import ByFirstLetter from "./by-first-letter/ByFirstLetter";
import DisplayDisease from "./display-disease/DisplayDisease";
import { letters } from "../../constants/configuration";

class DiseasesAndConditions extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={DisplayIndex} />
        <Route
          path={`${match.path}/index/letter/:letter`}
          component={ByFirstLetter}
        />
        <Route
          path={[
            `${match.path}/:diseaseName/symptoms-and-causes/:id`,
            `${match.path}/:diseaseName/diagnosis-and-treatment/:id`
          ]}
          component={DisplayDisease}
        />
        <Route path={`${match.path}/*`} component={NotFound} />
      </Switch>
    );
  }
}

function DisplayIndex(props) {
  const { history, match } = props;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Diseases and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Comprehensive guides on hundreds of conditions.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Find a disease by its first letter
      </Typography>
      <div className="diseases-and-conditions grid">
        <Grid container alignItems="center" spacing={2}>
          {letters.map((letter, index) => (
            <Grid item key={index}>
              <Fab
                size="medium"
                onClick={() => {
                  history.push(`${match.path}/index/letter/${letter}`);
                }}
              >
                {letter}
              </Fab>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default DiseasesAndConditions;
