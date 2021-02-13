import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
function LogoutForm(props) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={12} md={2}>
        <Paper variant="outlined" square>
          <Typography
            align="center"
            style={{ marginTop: "5vh", marginLeft: "5vh", marginRight: "5vh" }}
            variant="h4"
          >
            Are you sure you want to log out?
          </Typography>
          <Grid
            container
            spacing={2}
            justify="space-between"
            style={{ marginTop: "2vh", padding: 20, height: "100%" }}
          >
            <Link to="/overview">
              <Button
                type="submit"
                style={{ width: "30%" }}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </Link>
            <Link to="">
              <Button
                type="submit"
                style={{ width: "30%" }}
                variant="contained"
                color="primary"
                onClick={() => props.logout()}
              >
                Yes
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogoutForm);
