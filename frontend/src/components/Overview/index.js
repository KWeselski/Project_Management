import React, { Component } from "react";

import {
  Grid,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import StatusesTable from "./StatusesTable";
import ProjectRow from "./ProjectRow";
import { getProjects } from "../actions/projectActions";

const styles = (theme) => ({
  mainGrid: {
    minHeight: "600",
    marginTop: 25,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
  tableHead: {
    "& .MuiTableCell-head": {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  titleHead: {
    backgroundColor: "#15171c",
    width: 300,
  },
  cellHead: {
    backgroundColor: "#15171c",
    width: 130,
  },
  statusGrid: {
    maxHeight: 200,
  },
});

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
    const { classes, projects, token } = this.props;
    const { page, rowsPerPage } = this.state;
    if (!token) {
      return <Redirect to="" />;
    }

    return (
      <Grid container xs={12} md={12} className={classes.mainGrid}>
        <Grid item container sm={12} md={12} lg={10} xl={9}>
          <Paper variant="outlined" square>
            <TableContainer>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.titleHead}>Title</TableCell>
                    <TableCell className={classes.cellHead}>
                      Start Date
                    </TableCell>
                    <TableCell className={classes.cellHead}>End Date</TableCell>
                    <TableCell className={classes.cellHead}>Status</TableCell>
                    <TableCell className={classes.cellHead}>
                      Operations
                    </TableCell>
                  </TableRow>
                </TableHead>
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
        <Grid item sm={4} md={3} lg={2} className={classes.statusGrid}>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ProjectsList);
