import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography } from "@material-ui/core";
import {StyledDialog, StyledDialogContent, MainTypography} from './styles'


export default function ProfileDialog(props) {
  const { data, openDialog, setOpenDialog } = props;
  const values = data;
  return (
    <StyledDialog open={openDialog}>
      <DialogTitle>
        <Grid container xs={12} justify="space-between">
          <MainTypography variant="h5">
            {values.firstname + " " + values.lastname}
          </MainTypography>
          <Button
            type="submit"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            X
          </Button>
        </Grid>
      </DialogTitle>
      <StyledDialogContent dividers>
        <Grid container xs={12} alignItems="center">
          <Grid item container xs={12} justify="center">
            <Avatar style={{ height: 100, width: 100 }} src={values.avatar} />
          </Grid>
          <Grid item container xs={12} style={{ marginTop: 10, height: 200 }}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>Sex:</b> {values.sex}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography display="inline" variant="h6">
                <b>Age:</b> {values.age}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>Phone:</b> {values.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MainTypography variant="h8">
                <b>About me:</b> {values.description}
              </MainTypography>
            </Grid>
          </Grid>
        </Grid>
      </StyledDialogContent>
    </StyledDialog>
  );
}
