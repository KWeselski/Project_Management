import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StatusesTable from './StatusesTable'
import ProjectRow from './ProjectRow'
import {getProjects } from "../actions/projectActions";
import {
  StyledTableHead,
  StyledTableHeadCell,
} from "./styles";


class ProjectsList extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props;

    return (
      <Grid
        container
        xs={12}
        md={12}
        style={{ marginLeft: 220, marginTop: 25 }}
      >
        <Grid container xs={9}>
          <Paper variant="outlined" square>
            <Table style={{ minWidth: 1200 }}>
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
                  <ProjectRow project={project}/>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <StatusesTable projects={this.props.projects}/>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
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
