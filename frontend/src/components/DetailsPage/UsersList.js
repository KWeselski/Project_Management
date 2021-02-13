import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import UserForm from "../ProjectForms/UserForm";

export default function UsersList(props) {
  const { users } = props;
  return (
    <Paper
      variant="outlined"
      square
      style={{ maxHeight: "100%", overflow: "auto" }}
    >
      <Typography align="center" variant="h5">
        Users
      </Typography>
      <List dense style={{ maxHeight: "50vh", width: "100%", maxWidth: 350 }}>
        {users.map((user) => {
          return <UserForm value={user} confirmedUsers={true} />;
        })}
      </List>
    </Paper>
  );
}
