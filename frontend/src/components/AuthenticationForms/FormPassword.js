import React from "react";

import { Button, Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  formGrid: {
    marginTop: "2vh",
    padding: 20,
    height: "100%",
  },
  textField: {
    backgroundColor: "lightgray",
  },
}

function FormPassword(props) {
  const {
    classes,
    email,
    password1,
    password2,
    error,
    errorMessage,
    handleChange,
    returnStep,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.formGrid}
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
            label="Email Address"
            autoFocus
            value={email}
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            autoComplete="current-password"
            value={password1}
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password2"
            label="Password"
            type="password"
            id="password2"
            autoComplete="current-password"
            value={password2}
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={returnStep}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center">
        {error ? (
          <Grid container xs={12}>
            {errorMessage}
          </Grid>
        ) : (
          <React.Fragment />
        )}
      </Grid>
    </form>
  );
}
export default withStyles(styles)(FormPassword)
