import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography } from "@material-ui/core";
import React from "react";
import {MainTypography} from './styles';

export default function ProfilePageInfo(props) {
  const {firstName, lastName, avatar, sex, age, phone} = props;
  return (
    <React.Fragment>
      <Avatar
        style={{ height: 150, width: 150, marginTop: 20 }}
        src={avatar}
      />
      <MainTypography variant="h4">
        <b>{firstName + " " + lastName}</b>
      </MainTypography>
      <Grid container alignItem="flex-start">
        <Grid item xs={12}>
          <MainTypography variant="h6">
            <b>Sex:</b> {sex}
          </MainTypography>
        </Grid>
        <Grid item xs={12}>
          <MainTypography variant="h6">
            <b>Age:</b> {age}
          </MainTypography>
        </Grid>
        <Grid item xs={12}>
          <MainTypography variant="h6">
            <b>Phone:</b> {phone}
          </MainTypography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
