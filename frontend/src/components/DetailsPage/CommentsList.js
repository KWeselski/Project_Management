import { Grid, Typography, Paper, Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CreatorDiv } from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import axios from "axios";

export default function CommentsList(props) {
  const { id, creator } = props;
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const result = await axios.get(`/api/get_comments/${id}`);
    setComments(result.data);
  }, []);

  return (
    <Paper
      variant="outlined"
      square
      style={{ maxHeight: "100%", overflow: "auto" }}
    >
      <Typography align="center" variant="h5">
        Comments
      </Typography>
      <List dense style={{ maxHeight: "50vh", width: "100%" }}>
        {comments.map((comment) => {
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
                  <Grid container justify="space-between">
                    <Typography variant="h7">
                      <b>
                        {comment.profile.firstname +
                          " " +
                          comment.profile.lastname}
                      </b>
                    </Typography>
                    {creator == comment.user ? (
                      <CreatorDiv>Creator</CreatorDiv>
                    ) : (
                      <React.Fragment></React.Fragment>
                    )}
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
        })}
      </List>
    </Paper>
  );
}
