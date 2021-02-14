import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography } from "@material-ui/core";
import React from "react";

export default function ProfilePageInfo(props) {
  const {firstName, lastName, avatar, sex, age, phone} = props;
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      md={4}
      style={{ borderRight: "1px solid gray" }}
    >
      <Avatar
        style={{ height: 150, width: 150, marginTop: 20 }}
        src={avatar}
      />
      <Typography variant="h4" style={{ padding: 20 }}>
        <b>{firstName + " " + lastName}</b>
      </Typography>
      <Grid container alignItem="flex-start">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ padding: 20 }}>
            <b>Sex:</b> {sex}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ padding: 20 }}>
            <b>Age:</b> {age}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ padding: 20 }}>
            <b>Phone:</b> {phone}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
