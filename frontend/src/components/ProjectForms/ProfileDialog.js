import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledDialog = styled(Dialog)`
  position: absolute;
`;

const StyledDialogContent = styled(DialogContent)`
  height: 40vh;
  width: 30vh;
`;

export default function ProfileDialog(props) {
  const { data, openDialog, setOpenDialog } = props;
  const values = data;
  return (
    <StyledDialog open={openDialog}>
      <DialogTitle>
        <Grid container justify="space-between">
          <Typography style={{ padding: 10 }} variant="h5">
            {values.firstname + " " + values.lastname}
          </Typography>
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
        <Grid container xs={12}>
          <Grid container xs={12} justify="center">
            <Avatar style={{ height: 100, width: 100 }} src={values.avatar} />
          </Grid>
          <Grid container xs={12} style={{ marginTop: 10, height: 200 }}>
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
              <Typography variant="h8">
                <b>About me:</b> {values.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </StyledDialogContent>
    </StyledDialog>
  );
}
