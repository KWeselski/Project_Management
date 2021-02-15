import React from "react";

import {List, Paper, Typography} from "@material-ui/core";

import UserForm from "../ProjectForms/AddUsersForm/UserForm";

export default function UsersList(props) {
  const { users } = props;
  return (
    <Paper
      variant="outlined"
      square
      style={{ maxHeight: "100%", minWidth:200, overflow: "auto" }}
    >
      <Typography align="center" variant="h5">
        Users
      </Typography>
      <List dense style={{ maxHeight: "50vh", width: "100%", maxWidth: 350 }}>
        {users.map((user) => {
          return <UserForm values={user} confirmedUsers={true} />;
        })}
      </List>
    </Paper>
  );
}
