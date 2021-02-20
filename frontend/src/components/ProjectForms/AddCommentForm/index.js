import React, { useState } from "react";

import axios from "axios";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { MainGrid } from "../../styles";

function CommentForm(props) {
  const { token } = props;
  const [comment, setComment] = useState("");
  const [confirm, setConfirm] = useState(false);
  const id = String(window.location).split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(comment, id);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const createComment = (comment, id) => {
    axios
      .post(
        "/api/comment/create/",
        {
          comment: comment,
          project: id,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then(setConfirm(true));
  };

  if (!token) {
    return <Redirect to="" />;
  }

  if (confirm) {
    return <Redirect to={`/details/${id}`}></Redirect>;
  }
  return (
    <MainGrid
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
          <form onSubmit={handleSubmit}>
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
                  inputProps={{ maxLength: 350 }}
                  onChange={handleChange}
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
                  >
                    Back
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
    </MainGrid>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CommentForm);
