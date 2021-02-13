import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { CreatorDiv } from "./styles";

export default function CommentRow(props) {
  const { creator, comment } = props;
  const getCurrentDate = (com) => {
    const date = new Date(com);
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} Time: ${hour}:${minutes}`;
  };
  const comment_date = comment.date_added;
  const labelId = `checkbox-list-secondary-label-${comment.id}`;
  return (
    <ListItem key={comment.id} button>
      <ListItemAvatar>
        <Avatar
          src={comment.profile.avatar}
          style={{ backgroundColor: "green" }}
        ></Avatar>
      </ListItemAvatar>
      <ListItemText
        id={labelId}
        primary={
          <Grid container>
            <Grid container xs={12} justify="space-between">
              <Typography variant="h7">
                <b>
                  {comment.profile.firstname + " " + comment.profile.lastname}
                </b>
              </Typography>
              {creator == comment.user ? (
                <CreatorDiv>Creator</CreatorDiv>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </Grid>
            <Grid>
              <Typography variant="h7">
                {getCurrentDate(comment_date)}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={
          <React.Fragment>
            <Typography variant="h6">{comment.comment}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
