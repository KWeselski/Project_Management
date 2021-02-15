import React from "react";

import { Button, Grid, TextField, MenuItem } from "@material-ui/core";

export default function FormPersonalInfo(props) {
  const {
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
            inputProps={{ pattern: "[A-Za-z]{1,40}", maxLength: 40 }}
            value={firstName}
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
            inputProps={{ pattern: "[A-Za-z]{1,40}", maxLength: 40 }}
            value={lastName}
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
            value={sex}
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
            type="number"
            inputProps={{ min: 18, max: 80, pattern: "[0-9]{2}", maxLength: 2 }}
            maxLength="2"
            value={age}
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
            value={phone}
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
  );
}
