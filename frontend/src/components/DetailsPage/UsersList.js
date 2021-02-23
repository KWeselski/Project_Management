import React from "react";

import { List, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import UserForm from "../ProjectForms/AddUsersForm/UserForm";

const styles = {
  paper: {
    maxHeight: "100%",
    minWidth: 200,
    overflow: "auto",
  },
  list: {
    maxHeight: "50vh",
    width: "100%",
    maxWidth: 350,
  },
};

function UsersList(props) {
  const { classes, users } = props;
  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Typography align="center" variant="h5">
        Users
      </Typography>
      <List dense className={classes.list}>
        {users.map((user) => {
          return <UserForm values={user} confirmedUsers={true} />;
        })}
      </List>
    </Paper>
  );
}
export default withStyles(styles)(UsersList);
