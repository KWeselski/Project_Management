import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import ProfilePageInfo from "../ProfilePage/ProfilePageInfo";
import Avatar from "@material-ui/core/Avatar";
import { MainTypography } from "../ProfilePage/styles";

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
      <Grid item md={4} style={{ marginTop: 70, width: "100%" }}>
        <Paper variant="outlined" square style={{ height: "100%", overflow:'auto'}}>
          <Grid container style={{ height: 700 }}>
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
              style={{ padding: 20, marginTop: 30 }}
            >
              <Grid item md={12} style={{ height: "80%" }}>
                <Typography variant="h5">
                  <b>About Me:</b>
                </Typography>
                <MainTypography variant="h6">
                  {values.description}
                </MainTypography>
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
