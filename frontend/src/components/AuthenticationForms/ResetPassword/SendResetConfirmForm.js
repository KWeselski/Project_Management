import React from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  buttonGrid: {
    padding: 20,
  },
  title: {
    marginTop: "5vh",
    padding: 20,
  },
};

function SendResetConfirmForm(props) {
  const { classes } = props;
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" square>
          <Typography variant="h4">
            Thank you, we send you an email for reset password
          </Typography>
          <Grid
            item
            xs={12}
            md={12}
            align="center"
            className={classes.buttonGrid}
          >
            <Button
              component={Link}
              to=""
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Return
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default withStyles(styles)(SendResetConfirmForm);
