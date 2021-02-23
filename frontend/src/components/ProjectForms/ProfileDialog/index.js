import React from "react";

import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  dialog: {
    position: "absolute",
  },
  dialogContnent: {
    height: "40vh",
    minWidth: "30vh",
    maxWidth: "60vh",
  },
  title: {
    padding: 20,
    wordWrap: "break-word",
  },
  avatar: {
    height: 100,
    width: 100,
  },
  infoGrid: {
    marginTop: 10,
    height: 200,
  },
};

function ProfileDialog(props) {
  const { classes, data, openDialog, setOpenDialog } = props;
  const values = data;
  return (
    <Dialog open={openDialog} className={classes.dialog}>
      <DialogTitle>
        <Grid container xs={12} justify="space-between">
          <Typography className={classes.title} variant="h5">
            {values.first_name + " " + values.last_name}
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
      <DialogContent className={classes.dialogContnent} dividers>
        <Grid container xs={12} alignItems="center">
          <Grid item container xs={12} justify="center">
            <Avatar className={classes.avatar} src={values.avatar} />
          </Grid>
          <Grid item container xs={12} className={classes.infoGrid}>
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
              <Typography className={classes.title} variant="h8">
                <b>About me:</b> {values.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
export default withStyles(styles)(ProfileDialog);
