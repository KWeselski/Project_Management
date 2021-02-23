import React, { useState } from "react";

import { List, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";

import UserForm from "./UserForm";

const styles = {
  paper: {
    maxHeight: "100%",
    overflow: "auto",
  },
  list: {
    maxHeight: "50vh",
    width: "100%",
    maxWidth: 600,
  },
};

function AddUserForm(props) {
  const [loaded, setLoaded] = useState(false);
  const {
    classes,
    users,
    profiles,
    handleToogle,
    changeUsersData,
    activeUser,
  } = props;
  if (users.length > 0 && loaded == false && profiles.length > 0) {
    changeUsersData(profiles);
    setLoaded(true);
  }

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Typography align="center" variant="h5">
        Add users to project
      </Typography>
      <List dense className={classes.list}>
        {profiles.map((user) => {
          if (activeUser == user.id) {
            return;
          }
          return (
            <UserForm values={user} users={users} handleToogle={handleToogle} />
          );
        })}
      </List>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  profiles: state.project.profiles,
  activeUser: state.auth.user,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AddUserForm);
