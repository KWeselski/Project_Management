import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentsList from "./CommentsList";
import ProjectInfo from "./ProjectInfo";
import UsersList from "./UsersList";
import axios from 'axios'
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
      this.setState({data:res.data,loaded:true})
    })
  }


  componentDidMount() {
    this.getProjectValues();
  }

  render() {
    const { loaded, data } = this.state;
    const { profiles } = this.props;

    if (!loaded) {
      return <CircularProgress />;
    }
    return (
      <Grid container xs={12} style={{ marginLeft: 220 }}>
        <ProjectInfo data={data} profiles={profiles} />
        <UsersList users={data.users} />
        <CommentsList id={data.id} creator={data.creator} />
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  profiles: state.project.profiles,
});

export default connect(mapStateToProps)(DetailsPage);
