import React from "react";

import {Grid, Tooltip} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { OperationsData } from "./OperationsData";

function OperationIcons(props) {
  const { project, user } = props;
  return (
    <Grid container xs={12} justify="space-evenly">
      {OperationsData.map((item) => {
        if (
          project.creator != user &&
          (item.title == "Edit" || item.title == "Delete")
        ) {
          return;
        } else {
          return (
            <Tooltip title={item.title} aria-label={item.title}>
              <Link to={{ pathname: `${item.link}${project.id}` }}>
                <i>{item.icon}</i>
              </Link>
            </Tooltip>
          );
        }
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(OperationIcons);
