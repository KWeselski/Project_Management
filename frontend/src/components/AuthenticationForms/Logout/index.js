import React, {useState} from "react";

import { Button, Grid, Paper, Typography} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { logout } from "../../actions/authActions";

const styles = {
  
  mainGrid: {
    position:'absolute',
    top:'30%'
  },
  containerGrid: {
    padding:20,
    height: '100%'
  },
  button: {
    width: '30%'
  },
  title: {
    padding: 20,
    wordWrap: 'break-word'
  }
}

function LogoutForm(props) {
  const {classes} = props
  const [redirectToLogin, setRedirect] = useState(false);

  const handleLogout = async () => {
    await props.logout();
    setRedirect(true)
  }

  if(redirectToLogin){
    return <Redirect to=""/>;
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.mainGrid}
    >
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" square>
          <Typography
            align="center"
            variant="h4"
            className={classes.title}
          >
            Are you sure you want to log out?
          </Typography>
          <Grid
            container
            justify="space-evenly"
            className={classes.containerGrid}
            verticalAlign="middle"
          >
              <Button
                type="submit"
                to="/overview"
                component={Link}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                No
              </Button>
              <Button
                type="submit"
                component={Link}
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => handleLogout()}
              >
                Yes
              </Button>
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

export default compose(connect(null, mapDispatchToProps),withStyles(styles),)(LogoutForm);
