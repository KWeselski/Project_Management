import React, { Component } from "react";
import {Grid,} from "@material-ui/core";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentsList from './CommentsList'
import ProjectInfo from './ProjectInfo';
import UsersList from "./UsersList";

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

  getData = () => {
    let data = JSON.parse(localStorage.getItem("/details"));
    this.changeUsersData(data);
    this.setState({
      data: data,
      loaded: true,
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { loaded, data } = this.state;
    const { profiles } = this.props;

    if (!loaded) {
      return <CircularProgress />;
    }
    return (
      <Grid container xs={12} style={{ marginLeft: 220 }}>
        <ProjectInfo data={data} profiles={profiles}/>
        <UsersList users={data.users}/>
        <CommentsList id={data.id} creator={data.creator}/>
        </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  profiles: state.project.profiles,
  loading: state.project.loading,
  error: state.project.error,
});

export default connect(mapStateToProps)(DetailsPage);
