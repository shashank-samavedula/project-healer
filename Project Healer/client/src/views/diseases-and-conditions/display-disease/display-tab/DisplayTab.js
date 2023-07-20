import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

function DisplayTab(props) {
  const { data } = props;

  return (
    <Grid container className="display-tab grid">
      <Grid item xs={10} sm={9} md={8}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <HeadingType item={item} />
            <Content content={item.content} />
          </Fragment>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.scrollTo(0, 0)}
        >
          Go to Top
        </Button>
      </Grid>
    </Grid>
  );
}

function HeadingType(props) {
  const { item } = props;

  if (item.heading) {
    return (
      <Typography variant="h3" gutterBottom>
        {item.heading}
      </Typography>
    );
  } else if (item.sub_heading) {
    return (
      <Typography variant="h4" gutterBottom>
        {item.sub_heading}
      </Typography>
    );
  } else {
    return null;
  }
}

function Content(props) {
  const { content } = props;

  return content.map((content, index) => {
    if (content.type === "paragraph") {
      return (
        <Typography variant="body1" key={index} paragraph>
          {content.data}
        </Typography>
      );
    } else if (content.type === "list") {
      return (
        <ul key={index}>
          {content.data.map((li, index) => (
            <ListItem key={index} data={li} />
          ))}
        </ul>
      );
    } else {
      return null;
    }
  });
}

function ListItem(props) {
  const {
    data: { title, type, data }
  } = props;

  if (title.length > 0) {
    return (
      <Typography variant="body1" paragraph>
        <li>
          <strong>{title + " - "}</strong>
          {data}
        </li>
      </Typography>
    );
  } else {
    if (type === "text") {
      return (
        <Typography variant="body1" paragraph>
          <li>{data}</li>
        </Typography>
      );
    } else if (type === "paragraph") {
      return (
        <Typography variant="body1" paragraph>
          <li className="display-tab list-paragraph">{data}</li>
        </Typography>
      );
    }
  }
}

export default DisplayTab;
