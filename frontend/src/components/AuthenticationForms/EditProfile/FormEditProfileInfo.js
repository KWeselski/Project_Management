import React from "react";

import { Grid, Paper, Typography} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import FormPersonalInfo from "../FormPersonalInfo";

const styles = {
  mainGrid: {
    height: "80vh",
  },
  title: {
    marginTop: 15,
  },
};

function FormEditProfileInfo(props) {
  const {classes, nextStep, values, handleChange } = props;

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
      <Grid item xs={10} md={3}>
        <Paper variant="outlined" square>
          <Typography align="center" variant="h4" className={classes.title}>
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
export default withStyles(styles)(FormEditProfileInfo)
