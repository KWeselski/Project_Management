import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";

export default function CommentForm(props) {
  const [comment,setComment] = useState("")
  const [confirm,setConfirm] = useState(false)
  const id = String(window.location).split("/").pop()

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(comment, id);
  };

  const handleChange = (e) => {
    setComment({ [e.target.name]: e.target.value });
  };

  const createComment = (comment, id) => {
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
      .then(setConfirm(true));
  };

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
                    inputProps={{ maxLength: 250 }}
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
      </Grid>
    );
}
