import React, { Component } from "react";
import DisplayTab from "./display-tab/DisplayTab";
import { Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { displayDiseaseTheme } from "../../../constants/theme";
import { getDiseaseInformation } from "../../../api/api";
import { capitalizeFirstLetter } from "../../../utils/helpers";

class DisplayDisease extends Component {
  state = { isLoading: true, results: [], component: 1 };

  handleChange = (event, value) => {
    const {
      history,
      match: { params }
    } = this.props;

    if (value === 1) {
      history.push(
        `/diseases-and-conditions/${params.diseaseName}/symptoms-and-causes/${
          params.id
        }`
      );
    } else if (value === 2) {
      history.push(
        `/diseases-and-conditions/${
          params.diseaseName
        }/diagnosis-and-treatment/${params.id}`
      );
    }

    this.setState({ component: value });
  };

  handleDisplay = state => {
    const { results, component } = state;
    if (component === 1) {
      return results[0].symptomsAndCauses;
    } else if (component === 2) {
      return results[0].diagnosisAndTreatment;
    } else {
      return null;
    }
  };

  async componentDidMount() {
    const results = await getDiseaseInformation(this.props.match.params.id);

    if (
      this.props.match.path ===
      "/diseases-and-conditions/:diseaseName/symptoms-and-causes/:id"
    )
      this.setState({ results, isLoading: false, component: 1 });
    else if (
      this.props.match.path ===
      "/diseases-and-conditions/:diseaseName/diagnosis-and-treatment/:id"
    )
      this.setState({ results, isLoading: false, component: 2 });
  }

  render() {
    const { component, isLoading, results } = this.state;
    const { classes } = this.props;

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
            <Typography
              variant="h3"
              align="center"
              className={classes.diseaseName}
            >
              {capitalizeFirstLetter(results[0].name)}
            </Typography>
            <Paper elevation={1} className={classes.paper} square>
              <Tabs value={component} onChange={this.handleChange}>
                <Tab
                  value={1}
                  label="Symptoms & Causes"
                  className="display-disease tab"
                />
                <Tab
                  value={2}
                  label="Diagnosis & Treatment"
                  className="display-disease tab"
                />
              </Tabs>
            </Paper>
            <DisplayTab data={this.handleDisplay(this.state)} />
          </>
        );
      }
    }
  }
}

export default withStyles(displayDiseaseTheme)(DisplayDisease);
