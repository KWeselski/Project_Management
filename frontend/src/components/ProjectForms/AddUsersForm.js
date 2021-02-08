import React, { Component } from "react";
import List from "@material-ui/core/List";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import UserForm from "./UserForm";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  render() {
    const { loaded } = this.state;
    const { users, profiles, handleToogle } = this.props;
    if (users.length > 0 && loaded == false && profiles.length > 0) {
      this.props.changeUsersData();
      this.setState({ loaded: true });
    }
    return (
      <Paper style={{ maxHeight: "100%", overflow: "auto" }}>
        <Typography align="center" variant="h5">
          Add users to project
        </Typography>
        <List dense style={{ maxHeight: "50vh", width: "100%", maxWidth: 600 }}>
          {profiles.map((user) => {
            return (
              <UserForm
                value={user}
                users={users}
                handleToogle={handleToogle}
              />
            );
          })}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  profiles: state.project.profiles,
  loading: state.project.loading,
  error: state.project.error,
});

export default connect(mapStateToProps)(AddUserForm);
