import React from "react";

import { Button, Grid, TextField } from "@material-ui/core";

export default function FormPassword(props) {
  const {
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
            label="Email Address"
            autoFocus
            value={email}
            style={{ backgroundColor: "lightgray" }}
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
            style={{ backgroundColor: "lightgray" }}
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
            style={{ backgroundColor: "lightgray" }}
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
