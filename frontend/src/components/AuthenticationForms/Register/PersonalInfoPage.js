import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import FormPersonalInfo from "../FormPersonalInfo";

const styles = {
  mainGrid: {
    minHeight: "80vh"
  },
  title: {
    marginTop: "5vh"
  },
  paper: {
    marginTop: 20
  },
  linkGrid: {
    padding: 20
  },
  link: {
    textDecoration: "none"
  }
}

function PersonalInfoPage(props) {
  const {
    classes,
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
      className={classes.mainGrid}
    >
      <Grid item xs={10} sm={8} md={6} lg={3}>
        <Paper variant="outlined" square>
          <Typography align="center" className={classes.title} variant="h4">
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
        <Paper variant="outlined" square className={classes.paper}>
          <Grid container className={classes.linkGrid} justify="center">
            <Link className={classes.link} to="/">
              Already have an account?
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default withStyles(styles)(PersonalInfoPage)
