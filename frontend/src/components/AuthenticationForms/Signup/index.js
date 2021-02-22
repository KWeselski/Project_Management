import React from "react";

import { Button, Paper, Grid, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { authLogin } from "../../actions/authActions";

const styles = {
  mainGrid: {
    minHeight: "70vh",
  },
  buttonGrid: {
    padding: 20,
  },
  title: {
    marginTop: "5vh",
  },
  formGrid: {
    marginTop: "2vh",
    padding: 20,
    height: "100%",
  },
  textField: {
    backgroundColor: "lightgray",
  },
  button: {
    width: "50%",
  },
  linkGrid: {
    marginTop: 20,
  },
  link: {
    textDecoration: "none",
  },
};

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { classes, token, error } = this.props;
    const { email, password } = this.state;
    var errorMessage;

    if (error) {
      errorMessage = (
        <Grid container xs={12}>
          {Object.keys(error).map(function (key) {
            return (
              <Grid item align="center" xs={12}>
                <Typography variant="h7">{error[key].join(",")}</Typography>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    if (token) {
      return <Redirect to="/overview" />;
    }
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.mainGrid}
      >
        <Grid item sm={12} md={6}>
          <Paper variant="outlined" square>
            <Typography align="center" className={classes.title} variant="h4">
              Sign in
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                spacing={2}
                justify="center"
                className={classes.formGrid}
                verticalAlign="middle"
              >
                <Grid item xs={12} md={10}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    value={email}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} align="center">
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              {error ? (
                <React.Fragment>{errorMessage}</React.Fragment>
              ) : (
                <React.Fragment />
              )}
              <Grid item align="center">
                <Link className={classes.link} to="/password/reset/">
                  You don't remember password?
                </Link>
              </Grid>
            </form>
          </Paper>
          <Paper variant="outlined" square className={classes.linkGrid}>
            <Grid container className={classes.buttonGrid} justify="center">
              <Link className={classes.link} to="/register">
                Create account
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(authLogin(email, password)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LoginForm);
