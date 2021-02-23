import React, { useState } from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { deleteProject } from "../../actions/projectActions";

const styles = {
  mainGrid: {
    minHeight: "70vh",
  },
  paper: {
    margin: "5vh 5vh 0",
  },
  formGrid: {
    marginTop: "2vh",
    padding: 20,
    height: "100%",
  },
  button: {
    width: "30%",
  },
};

function DeleteProject(props) {
  const { classes } = props;
  const id = String(window.location).split("/").pop();
  const [deleted, setDeleted] = useState(false);
  const confirmDelete = async () => {
    await props.deleteProject(id);
    setDeleted(true);
  };

  if (deleted) {
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
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" square>
          <Typography align="center" className={classes.paper} variant="h4">
            Are you sure you want to delete the project?
          </Typography>
          <Grid
            container
            spacing={2}
            justify="space-between"
            className={classes.formGrid}
          >
            <Button
              component={Link}
              to="/overview"
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              No
            </Button>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => confirmDelete()}
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
    deleteProject: (project) => {
      dispatch(deleteProject(project));
    },
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(DeleteProject);
