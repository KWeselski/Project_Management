import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { OperationsData } from "./OperationsData";
import axios from "axios";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { deleteProject } from "../actions/projectActions";

function OperationIcons(props) {
  const {project, deleteProject, projects} = props;
 
  const linkToPath = (pathname, data) => {
    let savedData = JSON.stringify(data);
    localStorage.setItem(`${pathname}`, savedData);
  };

  /*
  const deleteProject = (project) => {
    const { projects } = this.props;
    axios.delete(
      "/api/delete_project",
      {
        data: { id: project.id },
      },
      { headers: { Authorization: `${localStorage.getItem("token")}` } }
    );
      .then(() => {
        const index = projects.indexOf(project);
        if (index > -1) {
          projects.splice(index, 1);
        }
        this.setState({ projects: projects });
      });
      
  }
  */

  return (
    <Grid container xs={12} justify="space-between">
      {OperationsData.map((item) => {
        return (
          <Tooltip title={item.title} aria-label={item.title}>
            <Link to={item.link}>
              <i
                onClick={() => {
                  if (item.title == "Comment") {
                    linkToPath("/add_comment/", project.id);
                  }
                  if (item.title == "Delete") {
                    deleteProject(project);
                  } else {
                    linkToPath(
                      `${item.link}`,
                      projects[projects.findIndex((x) => x.id === project.id)]
                    );
                  }
                }}
              >
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
