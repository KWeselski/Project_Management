import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                justify="center"
                spacing={2}
                style={{ marginTop: "2vh", padding: 20, height: "100%" }}
                verticalAlign="middle"
              >
                <Grid item xs={12} md={10}>
                  <TextField
                    autoComplete="firstName"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    inputProps={{ pattern: "[A-Za-z]{1,50}" }}
                    value={values.firstName}
                    style={{ backgroundColor: "lightgray" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    inputProps={{ pattern: "[A-Za-z]{1,50}" }}
                    value={values.lastName}
                    style={{ backgroundColor: "lightgray" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    variant="outlined"
                    select
                    required
                    fullWidth
                    name="sex"
                    label="Sex"
                    id="sex"
                    value={values.sex}
                    style={{ backgroundColor: "lightgray" }}
                    onChange={handleChange}
                  >
                    <MenuItem value="none" disabled>
                      Sex
                    </MenuItem>
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    inputProps={{ pattern: "[0-9]{2}", maxLength: 2 }}
                    maxLength="2"
                    value={values.age}
                    style={{ backgroundColor: "lightgray" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    inputProps={{ pattern: "[0-9]{9}", maxLength: 9 }}
                    value={values.phone}
                    style={{ backgroundColor: "lightgray" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} align="center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ width: "50%" }}
                    color="primary"
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default FormEditPersonalInfo
