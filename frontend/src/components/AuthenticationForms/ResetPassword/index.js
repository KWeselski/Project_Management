import React, { useState } from "react";

import axios from 'axios'
import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";

import SendResetConfirmForm from "./SendResetConfirmForm";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);
  var errorMessage;

  const resetPassword = (email) => {
    axios
      .post("/auth/password/reset/", {
        email: email,
      })
      .then(() => {
        setConfirmed(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetPassword(email);
  };

  if (error) {
    errorMessage = (
      <Grid container xs={12}>
        {Object.keys(error).map(function (key) {
          return (
            <Grid item align="center" xs={12}>
              <Typography variant="h7">{error[key].join(",")}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <React.Fragment>
    {confirmed ? (
      <SendResetConfirmForm/>
    ) : (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" square>
          <Typography
            align="center"
            style={{ marginTop: "5vh", padding: 20 }}
            variant="h4"
          >
            Enter your email for reset password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              justify="center"
              style={{ marginTop: "2vh", padding: 20, height: "100%" }}
              verticalAlign="middle"
            >
              <Grid item xs={12} md={10}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={email}
                  style={{ backgroundColor: "lightgray" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} align="center">
                <Button
                  type="submit"
                  style={{ width: "50%" }}
                  variant="contained"
                  color="primary"
                >
                  Reset password
                </Button>
              </Grid>
            </Grid>
            {error ? (
              <React.Fragment>{errorMessage}</React.Fragment>
            ) : (
              <React.Fragment />
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  )}
  </React.Fragment>
  );
}
export default ResetPassword;
