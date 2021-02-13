import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StatusesTable from "./StatusesTable";
import ProjectRow from "./ProjectRow";
import { getProjects } from "../actions/projectActions";
import { StyledTableHead, StyledTableHeadCell } from "./styles";
import { Redirect } from "react-router-dom";

class ProjectsList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.getProjects();
    }
  }

  render() {
    const { projects, token } = this.props;
    if (!token) {
      return <Redirect to="" />;
    }

    return (
      <Grid
        container
        xs={12}
        md={12}
        style={{ marginLeft: 220, marginTop: 25 }}
      >
        <Grid item container sm={12} md={12} lg={9} xl={9}>
          <Paper variant="outlined" square>
            <Table style={{ minWidth: 600, maxWidth: 1200 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell>Title</StyledTableHeadCell>
                  <StyledTableHeadCell style={{ width: 130 }}>
                    Start Date
                  </StyledTableHeadCell>
                  <StyledTableHeadCell style={{ width: 130 }}>
                    End Date
                  </StyledTableHeadCell>
                  <StyledTableHeadCell style={{ width: 120 }}>
                    Status
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>Operations</StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {projects.map((project) => (
                  <ProjectRow project={project} />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid
          item
          sm={4}
          md={3}
          lg={2}
          style={{ width: "100%", maxHeight: 200 }}
        >
          <StatusesTable projects={this.props.projects} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => {
      dispatch(getProjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
