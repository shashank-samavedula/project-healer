import React from "react";
import {
  Card,
  Divider,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { getItem } from "../../../utils/storage";
import { loginStorageKey } from "../../../constants/configuration";

function DisplayDashboard(props) {
  const { info } = getItem(loginStorageKey);

  return (
    <Grid container className="dashboard-grid main" justify="center">
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className="dashboard-grid container"
        >
          <Grid item>
            <Typography variant="h3" align="center">
              Personal info
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              Basic info, like your name and email, that you use on Project
              Healer
            </Typography>
          </Grid>
          <div className="dashboard-grid content">
            <Card className="dashboard-grid card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Profile
                </Typography>
                <Divider className="dashboard-grid divider" />
                <div className="dashboard-grid profile-container">
                  <div className="dashboard-grid profile-row">
                    <Typography variant="body1">Name</Typography>
                    <Typography variant="body1">
                      {info.firstName} {info.lastName}
                    </Typography>
                  </div>
                  <Divider className="dashboard-grid divider" />
                  <div className="dashboard-grid profile-row">
                    <Typography variant="body1">Gender</Typography>
                    <Typography variant="body1">{info.gender}</Typography>
                  </div>
                  <Divider className="dashboard-grid divider" />
                  <div className="dashboard-grid profile-row">
                    <Typography variant="body1">E-mail</Typography>
                    <Typography variant="body1">{info.email}</Typography>
                  </div>
                  <Divider className="dashboard-grid divider" />
                  <div className="dashboard-grid profile-row">
                    <Typography variant="body1">Date of Birth</Typography>
                    <Typography variant="body1">
                      {new Date(Date.parse(info.dateOfBirth)).toDateString()}
                    </Typography>
                  </div>
                  <Divider className="dashboard-grid divider" />
                </div>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DisplayDashboard;
