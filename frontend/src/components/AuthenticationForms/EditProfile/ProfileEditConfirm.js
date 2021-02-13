import React from "react";
import { Button, Grid,Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

export default function ProfileEditConfirm(props) {
  const { values, returnStep, returnToProfile, updateProfile } = props;
  const confirmProfile = async () => {
    await updateProfile();
    returnToProfile();
  };

  if (values.returnToProfile) {
    return <Redirect to="/profile"></Redirect>;
  }
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item md={4} style={{ marginTop: 100, width: "100%" }}>
        <Paper variant="outlined" square style={{ height: "100%" }}>
          <Grid container style={{ height: 600 }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              md={4}
              style={{ borderRight: "1px solid gray" }}
            >
              <Avatar
                style={{ height: 200, width: 200, marginTop: 20 }}
                src={values.avatar}
              />
              <Typography variant="h4" style={{ padding: 20 }}>
                <b>{values.firstName + " " + values.lastName}</b>
              </Typography>
              <Grid container alignItem="flex-start">
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ padding: 20 }}>
                    <b>Sex:</b> {values.sex}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ padding: 20 }}>
                    <b>Age:</b> {values.age}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ padding: 20 }}>
                    <b>Phone:</b> {values.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              md={8}
              direction="row"
              wrap="wrap"
              style={{ padding: 20, marginTop: 30 }}
            >
              <Grid item md={12} style={{ height: "80%" }}>
                <Typography variant="h5">
                  <b>About Me:</b>
                </Typography>
                <Typography variant="h6">{values.description}</Typography>
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
