import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormPersonalInfo from "../FormPersonalInfo";

class FormEditPersonalInfo extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

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
            <Typography
              align="center"
              style={{ marginTop: "5vh" }}
              variant="h4"
            >
              Edit your personal info
            </Typography>
            <FormPersonalInfo
              firstName={values.firstName}
              lastName={values.lastName}
              sex={values.sex}
              age={values.age}
              phone={values.phone}
              handleSubmit={this.handleSubmit}
              handleChange={handleChange}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default FormEditPersonalInfo;
