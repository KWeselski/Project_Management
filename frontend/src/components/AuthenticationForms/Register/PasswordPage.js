import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {authSignup} from "../../actions/authActions";
import Paper from "@material-ui/core/Paper";
import FormPassword from "../FormPassword";

const styles = {
  mainGrid: {
    minHeight: "70vh"
  },
  title: {
    marginTop: "5vh"
  },
  paper: {
    marginTop: 20
  },
  linkGrid: {
    padding: 20
  },
  link: {
    textDecoration: "none"
  }
}

function PasswordPage(props) {
  const [redirectToLogin, setRedirect] = useState(false);
  const {
    classes,
    returnStep,
    values,
    signup,
    handleChange,
    error,
  } = props;
  var errorMessage;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(
      values.email,
      values.password1,
      values.password2,
      values.firstName,
      values.lastName,
      values.sex,
      values.age,
      values.phone
    );
    setRedirect(true);
  };
  if (error) {
    errorMessage = (
      <Grid container xs={12}>
        {Object.keys(error).map(function (key) {
          return (
            <Grid item xs={12}>
              <Typography variant="h7">{error[key].join(",")}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  }
  if (error == null && redirectToLogin) {
    return <Redirect to="/overview"></Redirect>;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.mainGrid}
    >
      <Grid item sm={12} md={6} lg={3}>
        <Paper variant="outlined" square>
          <Typography align="center" className={classes.title} variant="h4">
            Register your account
          </Typography>
          <FormPassword
            email={values.email}
            password1={values.password1}
            password2={values.password2}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            returnStep={returnStep}
            error={error}
            errorMessage={errorMessage}
          />
        </Paper>
        <Paper variant="outlined" square className={classes.paper}>
          <Grid container className={classes.linkGrid} justify="center">
            <Link className={classes.link} to="/">
              Already have an account?
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (
      email,
      password1,
      password2,
      firstName,
      lastName,
      age,
      sex,
      phone
    ) =>
      dispatch(
        authSignup(
          email,
          password1,
          password2,
          firstName,
          lastName,
          age,
          sex,
          phone
        )
      ),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles))(PasswordPage);
