import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";
import { postArticle } from "../../../api/api";
import { connect } from "react-redux";
import queryString from "query-string";

const resetErrors = {
  titleError: "",
  contentError: ""
};

const showError = error => (error.length > 0 ? true : false);

class PostArticle extends Component {
  state = {
    title: "",
    titleError: "",
    description: "",
    content: "",
    contentError: ""
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const { title, description, content } = this.state;
    const { to = "/articles" } = queryString.parse(this.props.location.search);

    // Reset all the errors
    this.setState(resetErrors);

    if (title && description && content.length >= 100) {
      // call post article api
      postArticle(
        title,
        description,
        content,
        this.props.dispatch,
        this.props.history.replace,
        to
      );
    } else {
      let errorObj = {};
      if (!title) {
        errorObj.titleError = "Enter a title";
      }
      if (!description) {
        errorObj.description = this.state.content.slice(0, 200);
      }
      if (!content) {
        errorObj.contentError = "Enter some content for the article";
      } else if (content.length < 100) {
        errorObj.contentError =
          "Use 100 characters or more for your article content";
      }
      this.setState(errorObj);
    }
  };

  render() {
    const {
      title,
      titleError,
      description,
      content,
      contentError
    } = this.state;

    return (
      <>
        <Grid container className="post-article-grid main" justify="center">
          <Grid item>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              className="post-article-grid container"
            >
              <Grid item>
                <Typography variant="h3" align="center" gutterBottom>
                  WRITE. TEACH. HEAL.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="center" gutterBottom>
                  Project Healer Health Articles is a medium for doctors and
                  health specialists to inculcate helpful health tips and
                  guidance to millions of patients around the world. Knowledge
                  is the first step towards healing!
                </Typography>
              </Grid>
              <Grid
                container
                justify="center"
                className="post-article-grid content"
              >
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <div className="post-article-grid card-content">
                        <FormControl required error={showError(titleError)}>
                          <InputLabel>Title</InputLabel>
                          <Input
                            name="title"
                            value={title}
                            onChange={this.handleInput}
                          />
                          <ShowErrorMessage error={titleError} />
                        </FormControl>
                        <FormControl>
                          <InputLabel>Description</InputLabel>
                          <Input
                            multiline
                            name="description"
                            value={description}
                            onChange={this.handleInput}
                          />
                        </FormControl>
                        <FormControl required error={showError(contentError)}>
                          <InputLabel>Content</InputLabel>
                          <Input
                            multiline
                            name="content"
                            value={content}
                            onChange={this.handleInput}
                          />
                          <ShowErrorMessage error={contentError} />
                        </FormControl>
                      </div>
                    </CardContent>
                    <div className="post-article-grid btn">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

function ShowErrorMessage({ error }) {
  if (error.length > 0 && error !== "true")
    return <FormHelperText>{error}</FormHelperText>;
  else return null;
}

export default connect()(PostArticle);
