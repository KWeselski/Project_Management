import React, { useEffect, useState } from "react";

import axios from "axios";
import { List, Paper, Typography } from "@material-ui/core";

import CommentRow from "./CommentRow";

export default function CommentsList(props) {
  const { creator, id } = props;
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
      <List dense style={{ maxHeight: "80vh", width: "100%" }}>
        {comments.map((comment) => {
          return <CommentRow creator={creator} comment={comment} />;
        })}
      </List>
    </Paper>
  );
}
