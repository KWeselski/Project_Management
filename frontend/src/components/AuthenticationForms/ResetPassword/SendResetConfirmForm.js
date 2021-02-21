import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SendResetConfirmForm() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" square>
          <Typography variant="h4">
            Thank you, we send you an email for reset password
          </Typography>
          <Grid item xs={12} md={12} align="center" style={{ padding: 20 }}>
            <Button
              component={Link}
              to=""
              type="submit"
              style={{ width: "50%" }}
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
