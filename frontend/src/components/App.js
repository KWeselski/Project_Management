import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Overview from "./Overview/Overview";
import RegistrationForm from "./AuthenticationForms/RegistrationForm";
import LoginForm from "./AuthenticationForms/LoginForm";
import CreateProjectForm from "./ProjectForms/CreateProjectForm";
import EditProjectForm from "./ProjectForms/EditProjectForm";
import EditProfileForm from "./AuthenticationForms/ProfileComponents/EditProfileForm";
import ProfilePage from "./AuthenticationForms/ProfilePage";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DetailsPage from "./DetailsPage/DetailsPage";
import { getProjects } from "./actions/projectActions";
import { authCheckState } from "./actions/authActions";
import CommentForm from "./ProjectForms/CommentForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    if (this.props.isAuthenticated) {
      this.setState({ authenticated: true });
    }
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Sidebar open={this.state.authenticated} />
          <Grid container md={12}>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/register" component={RegistrationForm} />
              <Route exact path="/overview" component={Overview} />
              <Route
                exact
                path="/create_project"
                component={CreateProjectForm}
              />
              <Route exact path="/edit_project" component={EditProjectForm} />
              <Route exact path="/edit_profile" component={EditProfileForm} />
              <Route exact path="/details" component={DetailsPage} />
              <Route exact path="/add_comment" component={CommentForm} />
              <Route exact path="/profile" component={ProfilePage} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
