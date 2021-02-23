import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  status: {
    background: (props) =>
      (props.type === "new" && "lightblue") ||
      (props.type === "active" && "yellow") ||
      (props.type === "onhold" && "pink") ||
      (props.type === "completed" && "lightgreen") ||
      (props.type === "delayed" && "red"),
    textAlign: "center",
    borderRadius: 30,
    width: "100%",
    margin: "0 auto",
    fontWeight: "bold",
    textTransform: "capitalize",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
});

export default function StatusDiv(props) {
  const { type, ...other } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.status} {...other}>
      {type}
    </div>
  );
}

StatusDiv.PropTypes = {
  type: PropTypes.oneOf(["new", "active", "onhold", "completed", "delayed"]),
};
