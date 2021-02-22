import React, { useState } from "react";

import axios from "axios";
import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import SendResetConfirmForm from "./SendResetConfirmForm";

const styles = {
  mainGrid: {
    minHeight: "70vh",
  },
  title: {
    marginTop: "5vh",
    padding: 20,
  },
  formGrid: {
    marginTop: "2vh",
    padding: 20,
    height: "100%",
  },
  textField: {
    backgroundColor: "lightgray",
  },
  button: {
    width: "50%",
  },
};

function ResetPassword(props) {
  const { classes } = props;
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
        <SendResetConfirmForm />
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.mainGrid}
        >
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" square>
              <Typography align="center" variant="h4" className={classes.title}>
                Enter your email for reset password
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  verticalAlign="middle"
                  className={classes.formGrid}
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
                      className={classes.textField}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} align="center">
                    <Button
                      type="submit"
                      className={classes.button}
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
export default withStyles(styles)(ResetPassword);
