import React from "react";

import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authResetPasswordConfirm } from "../../actions/authActions";

const styles = {
  mainGrid: {
    minHeight: "70vh",
  },
  buttonGrid: {
    padding: 20,
  },
  title: {
    marginTop: "5vh",
    padding: 20,
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
};

class ResetPasswordConfirmForm extends React.Component {
  state = {
    password1: "",
    password2: "",
    reset: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { uid, token } = this.props.match.params;
    const { password1, password2 } = this.state;
    this.props.passwordConfirm(uid, token, password1, password2);
    this.setState({ reset: true });
  };

  render() {
    const { classes, error, password1, password2 } = this.props;
    const { reset } = this.state;
    var errorMessage;
    if (error == null && reset) {
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.mainGrid}
        >
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" square>
              <Typography align="center" variant="h4">
                Thank you, your password is changed
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

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.mainGrid}
      >
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" square>
            <Typography align="center" className={classes.title} variant="h4">
              Enter your new password
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
                    autoComplete="password1"
                    name="password1"
                    variant="outlined"
                    required
                    fullWidth
                    id="password1"
                    label="New password"
                    autoFocus
                    value={password1}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    autoComplete="password2"
                    name="password2"
                    variant="outlined"
                    required
                    fullWidth
                    id="password2"
                    label="Repeat password"
                    value={password2}
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
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passwordConfirm: (uid, token, password1, password2) =>
      dispatch(authResetPasswordConfirm(uid, token, password1, password2)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ResetPasswordConfirmForm);
