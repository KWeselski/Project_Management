import React from "react";
import { connect } from "react-redux";
import { authResetPassword } from "../../actions/authActions";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

class ResetPasswordForm extends React.Component {
  state = {
    email: "",
    reset: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { email } = this.state;
    this.props.reset(email);
    this.setState({ reset: true });
  };

  render() {
    const { token, error, email } = this.props;
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
          <Grid item xs={12} md={3}>
            <Paper variant="outlined" square>
              <Typography
                align="center"
                variant="h4"
              >
                Thank you, we send you an email for reset password
              </Typography>
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
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" square>
            <Typography
              align="center"
              style={{ marginTop: "5vh" }}
              variant="h4"
            >
              Enter your email for reset password
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
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    value={email}
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
                    Reset password
                  </Button>
                </Grid>
              </Grid>
              {error ? (
                <React.Fragment>{errorMessage}</React.Fragment>
              ) : (
                <React.Fragment />
              )}
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
    reset: (email) => dispatch(authResetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
