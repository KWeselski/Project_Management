import React from "react";

import { Avatar, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  avatar: {
    height: 150,
    width: 150,
    marginTop: 20,
  },
  info: {
    padding: 20,
    wordWrap: "break-word",
  },
};

function ProfilePageInfo(props) {
  const { classes, firstName, lastName, avatar, sex, age, phone } = props;
  return (
    <React.Fragment>
      <Grid item align="center">
        <Avatar className={classes.avatar} src={avatar} />
      </Grid>
      <Typography variant="h5" className={classes.info}>
        <b>{firstName + " " + lastName}</b>
      </Typography>
      <Grid container alignItem="flex-start">
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.info}>
            <b>Sex:</b> {sex}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.info}>
            <b>Age:</b> {age}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.info}>
            <b>Phone:</b> {phone}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default withStyles(styles)(ProfilePageInfo);
