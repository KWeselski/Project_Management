import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { OperationsData } from "./OperationsData";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { deleteProject } from "../actions/projectActions";


function OperationIcons(props) {
  const {project, deleteProject,} = props;
 
  return (
    <Grid container xs={12} justify="space-between">
      {OperationsData.map((item) => {
        return (
          <Tooltip title={item.title} aria-label={item.title}>
          <Link to={(item.title == "Delete") ? null : {pathname:`${item.link}${project.id}`}}>
            <i onClick={() =>{
              if(item.title == "Delete"){ deleteProject(project)}}
            }>
                {item.icon}
            </i>
            </Link>
          </Tooltip>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (project) => {
      dispatch(deleteProject(project));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationIcons);
