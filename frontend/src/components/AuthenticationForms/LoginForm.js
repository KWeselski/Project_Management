import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authLogin } from "../actions/authActions";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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
    const { token } = this.props;
    const { email, password } = this.props;
    if (token) {
      return <Redirect to="/overview"></Redirect>;
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
              Sign in
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
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid item align="center">
                <Link style={{ textDecoration: "none" }} to="/reset_password/">
                  You don't remember password?
                </Link>
              </Grid>
            </form>
          </Paper>
          <Paper variant="outlined" square style={{ marginTop: 20 }}>
            <Grid container style={{ padding: 20 }} justify="center">
              <Link style={{ textDecoration: "none" }} to="/register">
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
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(authLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
