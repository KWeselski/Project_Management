import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import {Link, Redirect } from "react-router-dom";

class CommentForm extends Component {
  state = {
    comment: "",
    confirm: false,
    id : String(window.location).split("/").pop(),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { comment,id } = this.state;
    this.createComment(comment,id);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createComment = (comment,id) => {
    
    axios
      .post(
        "/api/create_comment/",
        {
          comment: comment,
          project: id,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then(this.setState({ confirm: true }));
  };

  render() {
    const { comment, confirm,id } = this.state;
    if (confirm) {
      return <Redirect to={`/details/${id}`}></Redirect>;
    }
    return (
      <Grid
        container
        xs={12}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={10}>
          <Paper variant="outlined" squar>
            <Typography
              style={{ padding: 10, marginTop: 10, textAlign: "center" }}
              variant="h6"
            >
              Comment
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                justify="center"
                style={{ marginTop: "2vh", padding: 20, height: "100%" }}
              >
                <Grid item xs={12}>
                  <TextField
                    autoComplete="comment"
                    name="comment"
                    variant="outlined"
                    fullWidth
                    multiline={true}
                    rows={10}
                    id="comment"
                    label="Comment"
                    autoFocus
                    value={comment}
                    inputProps={{ maxLength: 250 }}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  xs={12}
                  md={12}
                  style={{ padding: 20 }}
                >
                  <Grid item>
                  <Button
                  component={Link}
                  to="/overview"
                  type="submit"
                  style={{ width: "30%" }}
                  variant="contained"
                  color="primary"
                >Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default CommentForm;
