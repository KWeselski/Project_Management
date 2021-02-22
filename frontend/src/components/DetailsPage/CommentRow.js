import React from "react";

import { Grid, Typography, Avatar } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  avatar: {
    backgroundColor: "green",
  },
  creatorDiv: {
    background: "#b8860b",
    fontWeight: "bold",
    borderRadius: 15,
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    textAlign: "center",
    width: 100,
  },
  comment: {
    wordWrap: "break-word",
  },
};

function CommentRow(props) {
  const { classes, creator, comment } = props;
  const getCurrentDate = (com) => {
    let date = new Date(com);
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} - ${hour}:${minutes}`;
  };
  const comment_date = comment.date_added;
  const labelId = `checkbox-list-secondary-label-${comment.id}`;
  return (
    <ListItem key={comment.id} button>
      <ListItemAvatar>
        <Avatar
          src={comment.profile.avatar}
          className={classes.avatar}
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
                <div className={classes.creatorDiv}>Creator</div>
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
            <Typography className={classes.comment} variant="h6">
              {comment.comment}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
export default withStyles(styles)(CommentRow)
