import React from "react";

import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authResetPasswordConfirm } from "../../actions/authActions";

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
    const { error, password1, password2 } = this.props;
    const { reset } = this.state;
    var errorMessage;
    if (error == null && reset) {
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "70vh" }}
        >
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" square>
              <Typography align="center" variant="h4">
                Thank you, your password is changed
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
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" square>
            <Typography
              align="center"
              style={{ marginTop: "5vh" }}
              variant="h4"
            >
              Enter your new password
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                spacing={2}
                justify="center"
                style={{ marginTop: "2vh", padding: 20, height: "100%" }}
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
                    style={{ backgroundColor: "lightgray" }}
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
                    style={{ backgroundColor: "lightgray" }}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} align="center">
                  <Button
                    type="submit"
                    style={{ width: "50%" }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordConfirmForm);
