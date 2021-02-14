import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
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
      <Grid item xs={10} md={3}>
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
