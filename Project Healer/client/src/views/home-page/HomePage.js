import React, { Component, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import doctorLight from "../../img/doctor-light.svg";
import doctorDark from "../../img/doctor-dark.svg";
import stethoscopeLight from "../../img/stethoscope-light.svg";
import stethoscopeDark from "../../img/stethoscope-dark.svg";
import articleLight from "../../img/article-light.svg";
import articleDark from "../../img/article-dark.svg";
import aboutusLight from "../../img/aboutus-light.svg";
import aboutusDark from "../../img/aboutus-dark.svg";

const DiseasesAndConditionsLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/diseases-and-conditions" {...props} />
));

const FindDoctorOnlineLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/online-doctors" {...props} />
));

const HealthArticlesLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/articles" {...props} />
));

const AboutUsLink = forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/about-us" {...props} />
));

export class HomePage extends Component {
  render() {
    const { paletteType } = this.props;

    return (
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        direction="row"
        className="home-page-grid container"
      >
        <Grid xs={12} md={6} item>
          <Card className="home-page-grid card">
            <CardContent>
              <Typography align="center" gutterBottom>
                <img
                  width="80px"
                  height="80px"
                  src={
                    paletteType === "dark" ? stethoscopeLight : stethoscopeDark
                  }
                  alt="StethoscopeIcon"
                />
              </Typography>
              <Typography variant="h4" color="inherit" align="center">
                <Link component={DiseasesAndConditionsLink} color="inherit">
                  Diseases and Conditions
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} item>
          <Card className="home-page-grid card">
            <CardContent>
              <Typography align="center" gutterBottom>
                <img
                  width="80px"
                  height="80px"
                  src={paletteType === "dark" ? doctorLight : doctorDark}
                  alt="DoctorIcon"
                />
              </Typography>
              <Typography variant="h4" color="inherit" align="center">
                <Link component={FindDoctorOnlineLink} color="inherit">
                  Find Doctor Online
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} item>
          <Card className="home-page-grid card">
            <CardContent>
              <Typography align="center" gutterBottom>
                <img
                  width="80px"
                  height="80px"
                  src={paletteType === "dark" ? articleLight : articleDark}
                  alt="HealthArticleIcon"
                />
              </Typography>
              <Typography variant="h4" color="inherit" align="center">
                <Link component={HealthArticlesLink} color="inherit">
                  Health Articles
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} item>
          <Card className="home-page-grid card">
            <CardContent>
              <Typography align="center" gutterBottom>
                <img
                  width="80px"
                  height="80px"
                  src={paletteType === "dark" ? aboutusLight : aboutusDark}
                  alt="AboutUsIcon"
                />
              </Typography>
              <Typography variant="h4" color="inherit" align="center">
                <Link component={AboutUsLink} color="inherit">
                  About Us
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default connect(({ theme }) => ({
  paletteType: theme.activeTheme.palette.type
}))(HomePage);
