import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { authSignup, createProfile } from "../../actions/authActions";
import Paper from "@material-ui/core/Paper";
import FormPassword from "../FormPassword";
function PasswordPage(props) {
  const [redirectToLogin, setRedirect] = useState(false);
  const { values, signup, createProfile } = props;
  const username = values.firstName + "_" + values.lastName;
  var errorMessage;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, values.email, values.password1, values.password2);
    await createProfile(
      values.firstName,
      values.lastName,
      values.sex,
      values.age,
      values.phone
    );
    setRedirect(true);
  };
  if (redirectToLogin) {
    return <Redirect to="/overview"></Redirect>;
  }
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
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={10} md={3}>
        <Paper variant="outlined" square>
          <Typography align="center" style={{ marginTop: "5vh" }} variant="h4">
            Register your account
          </Typography>
          <FormPassword
            email={values.email}
            password1={values.password1}
            password2={values.password2}
            handleChange={handleChange}
            handleSubmit={this.handleSubmit}
            returnStep={returnStep}
            error={error}
            errorMessage={errorMessage}
          />
        </Paper>
        <Paper variant="outlined" square style={{ marginTop: 20 }}>
          <Grid container style={{ padding: 20 }} justify="center">
            <Link style={{ textDecoration: "none" }} to="/">
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
    createProfile: (firstName, lastName, age, sex, phone) =>
      dispatch(createProfile(firstName, lastName, age, sex, phone)),
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
