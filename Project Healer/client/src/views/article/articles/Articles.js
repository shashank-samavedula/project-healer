import React, { Component } from "react";
import clsx from "clsx";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { articlesTheme } from "../../../constants/theme";
import {
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import { getArticles } from "../../../api/api";
import moment from "moment";

export class Articles extends Component {
  state = { expanse: [], isLoading: false, results: [] };

  handleExpandClick = event => {
    const item = event.currentTarget.name;
    this.setState(state => {
      const expanse = [...state.expanse];
      expanse[item] = !expanse[item];
      return { expanse };
    });
  };

  async componentDidMount() {
    const results = await getArticles();

    this.setState({ results, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { expanse, isLoading, results } = this.state;

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
          <Grid container className="articles-grid main" justify="center">
            <Grid item xs={12}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                direction="column"
                className="articles-grid container"
              >
                <Grid item>
                  <Typography variant="h3" align="center">
                    Top Health Articles
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="row"
                  className="articles-grid content"
                >
                  {results.map((article, index) => (
                    <Grid key={index} xs={12} md={6} lg={4} item>
                      <Card className="articles-grid card">
                        <CardHeader
                          avatar={
                            <Avatar className={classes.avatarIcon}>
                              {article.title.slice(0, 1).toUpperCase()}
                            </Avatar>
                          }
                          title={article.title}
                          subheader={moment(article.createdAt).format(
                            "Do MMMM YYYY"
                          )}
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            paragraph
                            className="articles-grid article-description"
                          >
                            {article.description}
                          </Typography>
                          <Typography variant="h6" color="textSecondary">
                            By Dr. {article.author.firstName}{" "}
                            {article.author.lastName}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                          <IconButton
                            name={index}
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expanse[index]
                            })}
                            onClick={this.handleExpandClick}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </CardActions>
                        <Collapse
                          in={expanse[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent>
                            <Typography
                              paragraph
                              className="articles-grid article-content"
                            >
                              {article.content}
                            </Typography>
                          </CardContent>
                        </Collapse>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }
  }
}

export default withStyles(articlesTheme)(Articles);
