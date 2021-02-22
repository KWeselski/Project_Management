import React from "react";

import { Button, Grid, TextField, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom"
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

function FormPersonalInfo(props) {
  const {
    classes,
    firstName,
    lastName,
    sex,
    age,
    phone,
    handleSubmit,
    handleChange,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        justify="center"
        spacing={2}
        className={classes.formGrid}
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
            inputProps={{ pattern: "[A-Za-ząĄćĆęĘłŁńŃóÓśŚźŹżŻ]{1,40}", maxLength: 40 }}
            value={firstName}
            className={classes.textField}
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
            inputProps={{ pattern: "[A-Za-ząĄćĆęĘłŁńŃóÓśŚźŹżŻ]{1,40}", maxLength: 40 }}
            value={lastName}
            className={classes.textField}
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
            value={sex}
            className={classes.textField}
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
            type="number"
            inputProps={{ min: 18, max: 80, pattern: "[0-9]{2}", maxLength: 2 }}
            maxLength="2"
            value={age}
            className={classes.textField}
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
            value={phone}
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to=""
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Continue
          </Button>
        </Grid>
        </Grid>
    </form>
  );
}

export default withStyles(styles)(FormPersonalInfo)
