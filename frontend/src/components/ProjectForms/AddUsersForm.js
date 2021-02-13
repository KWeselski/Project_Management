import React, { useState } from "react";
import List from "@material-ui/core/List";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import UserForm from "./UserForm";

function AddUserForm(props) {
  const [loaded, setLoaded] = useState(false);
  const { users, profiles, handleToogle, changeUsersData, activeUser } = props;
  if (users.length > 0 && loaded == false && profiles.length > 0) {
    changeUsersData(profiles);
    setLoaded(true);
  }

  return (
    <Paper
      variant="outlined"
      square
      style={{ maxHeight: "100%", overflow: "auto" }}
    >
      <Typography align="center" variant="h5">
        Add users to project
      </Typography>
      <List dense style={{ maxHeight: "50vh", width: "100%", maxWidth: 600 }}>
        {profiles.map((user) => {
          if (activeUser == user.user) {
            return;
          }
          return (
            <UserForm value={user} users={users} handleToogle={handleToogle} />
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

export default connect(mapStateToProps)(AddUserForm);
