import React, { Component, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Fab, Grid, Link, Typography } from "@material-ui/core";
import { getDiseaseIndex } from "../../../api/api";
import {
  capitalizeFirstLetter,
  symptomsAndCausesLink
} from "../../../utils/helpers";
import { letters } from "../../../constants/configuration";

const CustomLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

class ByFirstLetter extends Component {
  state = { isLoading: true, results: [] };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.match.params.letter.toUpperCase() !==
      prevProps.match.params.letter.toUpperCase()
    ) {
      const results = await getDiseaseIndex(
        this.props.match.params.letter.toLowerCase()
      );

      this.setState({ results });
    }
  }

  async componentDidMount() {
    const results = await getDiseaseIndex(
      this.props.match.params.letter.toLowerCase()
    );

    this.setState({ results, isLoading: false });
  }

  render() {
    const { isLoading, results } = this.state;
    const { match } = this.props;

    if (isLoading || results === "No record found") {
      return (
        <div className="by-first-letter grid">
          <Grid container spacing={2}>
            <Grid item sm={4} md={3}>
              <NarrowSearch {...this.props} />
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                {match.params.letter.toUpperCase()}
              </Typography>
              <Typography variant="h6">{results}</Typography>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="by-first-letter grid">
          <Grid container spacing={2}>
            <Grid item sm={4} md={3}>
              <NarrowSearch {...this.props} />
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                {match.params.letter.toUpperCase()}
              </Typography>
              <div className="by-first-letter grid-content">
                {results.map((disease, index) => (
                  <Typography key={index} variant="h6">
                    <Link
                      component={CustomLink}
                      to={`/diseases-and-conditions/${symptomsAndCausesLink(
                        disease.name
                      )}/${disease.id}`}
                      color="inherit"
                    >
                      {capitalizeFirstLetter(disease.name)}
                    </Link>
                  </Typography>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

function NarrowSearch(props) {
  const { history, match } = props;

  const handleColor = letter => {
    if (letter === match.params.letter.toUpperCase()) {
      return "primary";
    } else {
      return "default";
    }
  };

  return (
    <>
      <Typography variant="h6">Narrow your search</Typography>
      <Grid container spacing={1}>
        {letters.map((letter, index) => (
          <Grid item key={index}>
            <Fab
              size="small"
              color={handleColor(letter)}
              onClick={() => {
                history.push(`/diseases-and-conditions/index/letter/${letter}`);
              }}
            >
              {letter}
            </Fab>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ByFirstLetter;
