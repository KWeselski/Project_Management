import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import FormPersonalInfo from "../FormPersonalInfo";

export default function FormEditProfileInfo(props) {
  const { nextStep, values, handleChange } = props;

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
            Edit your personal info
          </Typography>
          <FormPersonalInfo
            firstName={values.firstName}
            lastName={values.lastName}
            sex={values.sex}
            age={values.age}
            phone={values.phone}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
