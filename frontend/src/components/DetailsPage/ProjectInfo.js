import React from "react";

import { Avatar, Paper, Grid, Typography } from "@material-ui/core";

import { Status, MainTypography } from "./styles";

export default function ProjectInfo(props) {
  const { data, profiles } = props;
  const creator = profiles[profiles.findIndex((x) => x.user === data.creator)];
  const getCurrentDate = (date) => {
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} Time: ${hour}:${minutes}`;
  };
  return (
    <Paper variant="outlined" square style={{ width: "100%", height: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <MainTypography variant="h5">{data.title}</MainTypography>
        </Grid>
        <Grid item container>
          <Grid item container xs={10} style={{ padding: 20 }}>
            <Typography variant="h6" style={{ marginRight: 10 }}>
              Created by:
            </Typography>
            <Avatar
              src={creator.avatar}
              style={{ backgroundColor: "green" }}
            ></Avatar>
            <Typography variant="h6" style={{ marginLeft: 10 }}>
              {creator.firstname + " " + creator.lastname}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ padding: 20 }}>
            <Status type={data.status}>{data.status}</Status>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} style={{ padding: 20, height: "50vh" }}>
        <Typography variant="h6">Project description:</Typography>
        <MainTypography variant="body1">{data.description}</MainTypography>
      </Grid>
      <Grid
        container
        xs={12}
        md={12}
        style={{ padding: 20 }}
        justify="space-evenly"
      >
        <Grid item>
          <Typography variant="h8">
            <b>Start Date:</b> {getCurrentDate(new Date(data.start_date))}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h8">
            <b>End Date:</b> {getCurrentDate(new Date(data.end_date))}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
