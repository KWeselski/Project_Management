import React from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../actions/authActions";
import { MainGrid, MainTypography} from "../ProfilePage/styles";

function LogoutForm(props) {
  return (
    <MainGrid
      container
      direction="column"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" square>
          <MainTypography
            align="center"
            variant="h4"
          >
            Are you sure you want to log out?
          </MainTypography>
          <Grid
            container
            justify="space-evenly"
            style={{padding: 20, height: "100%" }}
            verticalAlign="middle"
          >
              <Button
                type="submit"
                to="/overview"
                component={Link}
                style={{ width: "30%" }}
                variant="contained"
                color="primary"
              >
                No
              </Button>
              <Button
                type="submit"
                to=""
                component={Link}
                style={{ width: "30%" }}
                variant="contained"
                color="primary"
                onClick={() => props.logout()}
              >
                Yes
              </Button>
          </Grid>
        </Paper>
      </Grid>
    </MainGrid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogoutForm);
