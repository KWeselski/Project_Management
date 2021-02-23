import React from "react";

import { Avatar, Paper, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StatusDiv from "../Overview/StatusDiv";

const styles = {
  name: {
    marginLeft: 10,
  },
  created: {
    marginRight: 10,
  },
  avatar: {
    backgroundColor: "green",
  },
  paper: {
    width: "100%",
    height: "100%",
  },
  title: {
    padding: 20,
    wordWrap: "break-word",
  },
  infoGrid: {
    padding: 20,
  },
  descriptionGrid: {
    padding: 20,
    height: "50vh",
  },
};

function ProjectInfo(props) {
  const { classes, data, profiles } = props;
  const creator = profiles[profiles.findIndex((x) => x.id === data.creator)];
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
    <Paper variant="outlined" square className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            {data.title}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item container xs={10} className={classes.infoGrid}>
            <Typography variant="h6" className={classes.created}>
              Created by:
            </Typography>
            <Avatar
              src={creator.avatar}
              style={{ backgroundColor: "green" }}
            ></Avatar>
            <Typography variant="h6" className={classes.name}>
              {creator.first_name + " " + creator.last_name}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.infoGrid}>
            <StatusDiv type={data.status} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} className={classes.descriptionGrid}>
        <Typography variant="h6">Project description:</Typography>
        <Typography variant="body1" className={classes.title}>
          {data.description}
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        md={12}
        className={classes.infoGrid}
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
export default withStyles(styles)(ProjectInfo);
