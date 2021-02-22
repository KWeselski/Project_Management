import React, { useEffect, useState } from "react";

import axios from "axios";
import { List, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import CommentRow from "./CommentRow";

const styles = {
  paper: {
    maxHeight: "100%",
    overflow: "auto",
  },
  list: {
    maxHeight: "80vh",
    width: "100%",
  },
};

function CommentsList(props) {
  const { classes, creator, id } = props;
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    const result = await axios.get(`/api/comments/get/${id}`);
    setComments(result.data);
  }, []);

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Typography align="center" variant="h5">
        Comments
      </Typography>
      <List dense className={classes.list}>
        {comments.map((comment) => {
          return <CommentRow creator={creator} comment={comment} />;
        })}
      </List>
    </Paper>
  );
}

export default withStyles(styles)(CommentsList);
