import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import ProfileDialog from "../ProfileDialog/index";

export default function UserForm(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const { values, users, handleToogle, confirmedUsers } = props;
  const labelId = `checkbox-list-secondary-label-${values.id}`;

  const open = () => {
    setOpenDialog(true);
  };

  if (confirmedUsers) {
    return (
      <React.Fragment>
        <ListItem key={values.id} button onClick={open}>
          <ListItemAvatar>
            <Avatar
              src={values.avatar}
              style={{ backgroundColor: "green" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText
            id={labelId}
            primary={values.firstname + ` ` + values.lastname}
          />
        </ListItem>
        <ProfileDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          data={values}
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ListItem key={values.id} button onClick={open}>
          <ListItemAvatar>
            <Avatar
              style={{ backgroundColor: "green" }}
              alt={values.firstname}
              src={values.avatar}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText
            id={labelId}
            primary={values.firstname + ` ` + values.lastname}
          />
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToogle(values)}
              checked={
                users
                  .map((v) => {
                    return v.id;
                  })
                  .indexOf(values.id) !== -1
              }
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ProfileDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          data={values}
        />
      </React.Fragment>
    );
  }
}
