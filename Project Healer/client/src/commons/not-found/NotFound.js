import React from "react";
import { Typography } from "@material-ui/core";

function NotFound(props) {
  return (
    <div className="not-found container">
      <Typography variant="h2" className="not-found h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" className="not-found body1-1" paragraph>
        We couldn't find what you were looking for.
      </Typography>
      <Typography variant="body1" className="not-found body1-2">
        The page name may have changed, you may have happened upon a broken
        link, or the URL may be entered incorrectly.
      </Typography>
    </div>
  );
}

export default NotFound;
