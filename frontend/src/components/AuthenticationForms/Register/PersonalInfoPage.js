import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import FormPersonalInfo from "../FormPersonalInfo";

export default function PersonalInfoPage(props) {
  const {
    firstName,
    lastName,
    sex,
    age,
    phone,
    handleChange,
    nextStep,
  } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={3}>
        <Paper variant="outlined" square>
          <Typography align="center" style={{ marginTop: "5vh" }} variant="h4">
            Type your personal info
          </Typography>
          <FormPersonalInfo
            firstName={firstName}
            lastName={lastName}
            sex={sex}
            age={age}
            phone={phone}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Paper>
        <Paper variant="outlined" square style={{ marginTop: 20 }}>
          <Grid container style={{ padding: 20 }} justify="center">
            <Link style={{ textDecoration: "none" }} to="/">
              Already have an account?
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
