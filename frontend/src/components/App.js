import React, { Component } from "react";


import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CommentForm from "./ProjectForms/AddCommentForm";
import DeleteProject from "./Overview/DeleteProject";
import DetailsPage from "./DetailsPage";
import EditProfileForm from "./AuthenticationForms/EditProfile";
import LoginForm from "./AuthenticationForms/Signup";
import LogoutForm from "./AuthenticationForms/Logout";
import ProfilePage from "./AuthenticationForms/ProfilePage";
import ProjectForm from "./ProjectForms";
import ProjectsList from "./Overview";
import RegistrationForm from "./AuthenticationForms/Register";
import ResetPasswordForm from "./AuthenticationForms/ResetPassword";
import ResetPasswordConfirmForm from "./AuthenticationForms/ResetPassword/ResetPasswordConfirmForm";
import Sidebar from "./Sidebar/Sidebar";
import { getProjects } from "./actions/projectActions";
import { authCheckState, loadUser } from "./actions/authActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      if (this.props.isAuthenticated) {
        await this.props.loadUser();
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    }
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Sidebar open={this.state.authenticated} />
          <Grid container>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/register" component={RegistrationForm} />
              <Route exact path="/logout" component={LogoutForm} />
              <Route
                exact
                path="/password/reset"
                component={ResetPasswordForm}
              />
              <Route
                exact
                path="/rest-auth/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirmForm}
              />
              <Route exact path="/overview" component={ProjectsList} />
              <Route exact path="/project/create" component={ProjectForm} />
              <Route exact path="/project/edit/:id" component={ProjectForm} />
              <Route exact path="/project/delete/:id" component={DeleteProject} />
              <Route exact path="/details/:id" component={DetailsPage} />
              <Route exact path="/comment/add/:id" component={CommentForm} />
              <Route exact path="/profile" component={ProfilePage} />  
              <Route exact path="/profile/edit" component={EditProfileForm} />       
            </Switch>
          </Grid>
        </Router>
      </MuiPickersUtilsProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => {
      dispatch(getProjects());
    },
    onTryAutoSignup: () => dispatch(authCheckState()),
    loadUser: () => {
      dispatch(loadUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
