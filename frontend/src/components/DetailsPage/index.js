import React, { Component } from "react";

import axios from "axios";
import { CircularProgress, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";

import CommentsList from "./CommentsList";
import ProjectInfo from "./ProjectInfo";
import UsersList from "./UsersList";

const styles = (theme) => ({
  mainGrid: {
    marginTop: 20,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
});

class DetailsPage extends Component {
  state = {
    loaded: false,
    data: [],
  };

  changeUsersData = (data) => {
    const { profiles } = this.props;
    console.log(profiles)
    const users_in_project = [];
    data.users.map((user) => {
      let index = profiles.findIndex((x) => x.id == user);
      users_in_project.push(profiles[index]);
    });
    data.users.length = 0;
    data.users = [...users_in_project];
  };

  getProjectValues = async () => {
    const id = String(window.location).split("details/").pop();
    await axios.get(`/api/project/get/${id}`).then((res) => {
      this.changeUsersData(res.data);
      this.setState({ data: res.data, loaded: true });
    });
  };

  componentDidMount() {
    this.getProjectValues();
  }

  render() {
    const { loaded, data } = this.state;
    const { classes, profiles } = this.props;

    if (!loaded) {
      return <CircularProgress />;
    }
    return (
      <Grid container xs={12} className={classes.mainGrid}>
        <Grid item sm={12} md={12} lg={5}>
          <ProjectInfo data={data} profiles={profiles} />
        </Grid>
        <Grid item sm={12} md={4} lg={3}>
          <UsersList users={data.users} />
        </Grid>
        <Grid item sm={12} md={8} lg={4}>
          <CommentsList id={data.id} creator={data.creator} />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  profiles: state.auth.profiles,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(DetailsPage);
