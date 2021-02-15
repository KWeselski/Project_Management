import React, { useState } from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { deleteProject } from "../../actions/projectActions";

function DeleteProject(props) {
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
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" square>
          <Typography
            align="center"
            style={{ marginTop: "5vh", marginLeft: "5vh", marginRight: "5vh" }}
            variant="h4"
          >
            Are you sure you want to delete the project?
          </Typography>
          <Grid
            container
            spacing={2}
            justify="space-between"
            style={{ marginTop: "2vh", padding: 20, height: "100%" }}
          >
            <Button
              component={Link}
              to="/overview"
              type="submit"
              style={{ width: "30%" }}
              variant="contained"
              color="primary"
            >
              No
            </Button>
            <Button
              type="submit"
              style={{ width: "30%" }}
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

export default connect(null, mapDispatchToProps)(DeleteProject);
