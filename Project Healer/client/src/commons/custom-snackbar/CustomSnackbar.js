import React, { useEffect, useState } from "react";
import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import {
  CheckCircle as SuccessIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { customSnackbarTheme } from "../../constants/theme";
import { connect } from "react-redux";
import { setStatusInit } from "../../actions/status.action";
import { isEmpty } from "lodash";
import { ERROR, INFO, SUCCESS, WARNING } from "../../constants/configuration";

const variantIcon = {
  [ERROR]: ErrorIcon,
  [INFO]: InfoIcon,
  [SUCCESS]: SuccessIcon,
  [WARNING]: WarningIcon
};

const useStyles = makeStyles(customSnackbarTheme);

function CustomSnackbar(props) {
  const classes = useStyles();
  const { status } = props;
  const [open, setOpen] = useState(false);
  const Icon = variantIcon[status.type || INFO];

  const handleSnackbar = (event, reason) => {
    if (reason !== "clickaway" && status.openSnackbar) {
      setOpen(false);
      props.setStatusInit();
    }
  };

  useEffect(() => {
    if (!isEmpty(status) && status.openSnackbar) setOpen(true);
  }, [status]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleSnackbar}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <Icon className={classes.iconVariant} fontSize="small" />
            {status.message}
          </span>
        }
        action={
          <IconButton color="inherit" onClick={handleSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        className={classes[status.type || INFO]}
      />
    </Snackbar>
  );
}

export default connect(
  ({ status }) => ({ status }),
  { setStatusInit }
)(CustomSnackbar);
