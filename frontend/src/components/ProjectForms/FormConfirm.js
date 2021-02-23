import React, { Component } from "react";

import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createProject, updateProject } from "../actions/projectActions";
import UsersList from "../DetailsPage/UsersList";

const styles = (theme) => ({
  mainGrid: {
    minHeight: "70vh",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
  title: {
    padding: 40,
  },
  paper: {
    width: "100%",
  },
  item: {
    padding: 20,
  },
});

class FormConfirm extends Component {
  getCurrentDate = (date) => {
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} Time: ${hour}:${minutes}`;
  };

  confirmProject = async () => {
    const {
      title,
      status,
      description,
      startDate,
      endDate,
      projectId,
      creator,
    } = this.props.values;
    const { create, update } = this.props;
    const values = { title, description, status, startDate, endDate, creator };
    let users = this.props.values.users.map((a) => a.id);
    if (create) {
      await this.props.createProject(values, users);
    }
    if (update) {
      await this.props.updateProject(values, users, projectId);
    }
    this.props.returnToOverview();
  };
  render() {
    const {
      classes,
      values,
      update,
      returnStep,
      returnToOverview,
    } = this.props;
    if (values.toOverview) {
      return <Redirect to="/overview" />;
    }
    return (
      <Grid className={classes.mainGrid} container xs={12}>
        <Grid item xs={12}>
          <Typography align="center" variant="h3" className={classes.title}>
            Confirm new project
          </Typography>
        </Grid>
        <Grid item container spacing={3} xs={12}>
          <Grid container item xs={12} md={12} lg={5} textAlign="center">
            <Paper variant="outlined" square className={classes.paper}>
              <Grid item xs={8} md={8} className={classes.item}>
                <TextField
                  readonly
                  fullWidth
                  value={values.title}
                  inputProps={{ style: { fontSize: "1.4rem" }, maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={12} className={classes.item}>
                <TextField
                  readonly
                  name="description"
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={values.description}
                  rows={15}
                  inputProps={{ maxLength: 1000 }}
                  multiline={true}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={12} md={12} lg={2}>
            <UsersList users={values.users} />
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <Paper variant="outlined" square>
              <Grid item className={classes.item}>
                <span>
                  <Typography variant="h6">
                    Start Date: {this.getCurrentDate(values.startDate)}
                  </Typography>
                  <Typography variant="h6">
                    End Date: {this.getCurrentDate(values.endDate)}
                  </Typography>
                  {update ? (
                    <Typography variant="h6">
                      Status: {values.status}{" "}
                    </Typography>
                  ) : (
                    <React.Fragment />
                  )}
                </span>
              </Grid>
              <Grid
                item
                container
                justify="space-between"
                xs={12}
                md={12}
                className={classes.item}
              >
                <Grid item>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={returnToOverview}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={returnStep}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.confirmProject}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (values, users) => {
      dispatch(createProject(values, users));
    },
    updateProject: (values, users, id) => {
      dispatch(updateProject(values, users, id));
    },
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(FormConfirm);
