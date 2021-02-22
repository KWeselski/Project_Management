import React from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

import ProfilePageInfo from "../ProfilePage/ProfilePageInfo";

const styles = (theme) => ({
  mainGrid: {
    marginTop: 70,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
  paper: {
    height: "100%",
    overflow: "auto",
  },
  profileGrid: {
    height: 700,
  },
  aboutInfoGrid: {
    padding: 20,
    marginTop: 30,
  },
  aboutGridItem: {
    height: "80%",
  },
  description: {
    padding: 20,
    wordWrap: "break-word",
  },
});

function ProfileEditConfirm(props) {
  const { classes, values, returnStep, returnToProfile, updateProfile } = props;
  const confirmProfile = async () => {
    await updateProfile();
    returnToProfile();
  };

  if (values.returnToProfile) {
    return <Redirect to="/profile"></Redirect>;
  }
  return (
    <Grid container direction="column" alignItems="center">
      <Grid md={4} className={classes.mainGrid}>
        <Paper variant="outlined" square className={classes.paper}>
          <Grid container className={classes.profileGrid}>
            <Grid item xs={4}>
              <ProfilePageInfo
                avatar={values.avatar}
                firstName={values.firstName}
                lastName={values.lastName}
                sex={values.sex}
                age={values.age}
                phone={values.phone}
              />
            </Grid>
            <Grid
              item
              container
              md={8}
              direction="row"
              className={classes.aboutInfoGrid}
            >
              <Grid item md={12} className={classes.aboutGridItemm}>
                <Typography variant="h5">
                  <b>About Me:</b>
                </Typography>
                <Typography variant="h6" className={classes.description}>
                  {values.description}
                </Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                md={12}
              >
                <Grid item md={6}>
                  <Button
                    onClick={returnStep}
                    variant="contained"
                    fullwidth
                    color="primary"
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    onClick={confirmProfile}
                    fullwidth
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default withStyles(styles)(ProfileEditConfirm);
