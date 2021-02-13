import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import ProjectsList from "./Overview/ProjectsList";
import RegistrationForm from "./AuthenticationForms/Register/index";
import LoginForm from "./AuthenticationForms/Signup/index";
import LogoutForm from './AuthenticationForms/Logout/index';
import ProjectForm from "./ProjectForms/index";
import EditProfileForm from "./AuthenticationForms/EditProfile/index";
import ProfilePage from "./AuthenticationForms/ProfilePage/index";
import DetailsPage from "./DetailsPage/index";
import CommentForm from "./ProjectForms/AddCommentForm";
import DeleteProject from "./Overview/DeleteProject";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
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

  async componentDidUpdate(prevProps){
    if(prevProps.isAuthenticated !== this.props.isAuthenticated){
      if(this.props.isAuthenticated){
        await this.props.loadUser();
        this.setState({ authenticated: true})
      }
      else{this.setState({ authenticated: false });}
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
              <Route exact path="/logout" component={LogoutForm} />
              <Route exact path="/overview" component={ProjectsList} />
              <Route exact path="/create_project" component={ProjectForm} />
              <Route exact path="/edit_project/:id" component={ProjectForm} />
              <Route exact path="/edit_profile" component={EditProfileForm} />
              <Route exact path="/details/:id" component={DetailsPage} />
              <Route exact path="/add_comment/:id" component={CommentForm} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/delete/:id" component={DeleteProject}/>
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
