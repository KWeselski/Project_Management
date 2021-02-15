import React, { Component } from "react";

import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Paper
} from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import StatusesTable from "./StatusesTable";
import ProjectRow from "./ProjectRow";
import { getProjects } from "../actions/projectActions";
import { StyledTableHead, StyledTableHeadCell } from "./styles";
import { MainGrid } from "../styles"

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 6,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePage = (e, newPage) => {
    this.setState({ page: newPage });
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.getProjects();
    }
  }

  render() {
    const { projects, token } = this.props;
    const { page, rowsPerPage } = this.state;
    if (!token) {
      return <Redirect to="" />;
    }

    return (
      <MainGrid
        container
        xs={12}
        md={12}
        style={{marginTop: 25 }}
      >
        <Grid item container sm={12} md={12} lg={10} xl={9}>
          <Paper variant="outlined" square>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell style={{ width: 300 }}>Title</StyledTableHeadCell>
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
                {(rowsPerPage > 0
                  ? projects.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : projects
                ).map((project) => (
                  <ProjectRow project={project} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[6]}
              component="div"
              count={projects.length}
              rowsPerPage={6}
              page={page}
              onChangePage={this.handleChangePage}
            />
            </TableContainer>
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
      </MainGrid>
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
