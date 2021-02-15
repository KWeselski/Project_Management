import React, { Component } from "react";

import axios from "axios";
import { CircularProgress, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import CommentsList from "./CommentsList";
import ProjectInfo from "./ProjectInfo";
import UsersList from "./UsersList";
import { MainGrid } from "../styles"

class DetailsPage extends Component {
  state = {
    loaded: false,
    data: [],
  };

  changeUsersData = (data) => {
    const { profiles } = this.props;
    const users_in_project = [];
    data.users.map((user) => {
      let index = profiles.findIndex((x) => x.user == user);
      users_in_project.push(profiles[index]);
    });
    data.users.length = 0;
    data.users = [...users_in_project];
  };

  getProjectValues = async () => {
    const id = String(window.location).split("/").pop();
    await axios.get(`/api/get_project/${id}`).then((res) => {
      this.changeUsersData(res.data);
      this.setState({ data: res.data, loaded: true });
    });
  };

  componentDidMount() {
    this.getProjectValues();
  }

  render() {
    const { loaded, data } = this.state;
    const { profiles } = this.props

    if (!loaded) {
      return <CircularProgress />;
    }
    return (
      <MainGrid container xs={12} style={{marginTop:20 }}>
        <Grid item sm={12} md={12} lg={5}>
          <ProjectInfo data={data} profiles={profiles} />
        </Grid>
        <Grid item sm={12} md={4} lg={3}>
          <UsersList users={data.users} />
        </Grid>
        <Grid item sm={12} md={8} lg={4}>
          <CommentsList id={data.id} creator={data.creator} />
        </Grid>
      </MainGrid>
    );
  }
}
const mapStateToProps = (state) => ({
  profiles: state.project.profiles,
});

export default connect(mapStateToProps)(DetailsPage);
