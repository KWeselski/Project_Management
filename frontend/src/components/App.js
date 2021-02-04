import React, { Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from
'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Overview from './Overview';
import RegistrationForm from './AuthenticationForms/RegistrationForm';
import LoginForm from './AuthenticationForms/LoginForm';
import CreateProjectForm from './ProjectForms/CreateProjectForm';
import EditProjectForm from './ProjectForms/EditProjectForm';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DetailsPage from './DetailsPage'


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props;
        
        return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
                    <Sidebar/> 
                    <Grid container md={12}>
                        <Grid item md={2}>                      
                        </Grid>
                        <Grid container md={10}>
                            <Switch>
                                <Route exact path="/" component={Overview}/>
                                <Route exact path="/register" component={RegistrationForm}/>
                                <Route exact path='/overview' component={LoginForm}/>
                                <Route exact path="/create_project" component={CreateProjectForm}/>
                                <Route exact path="/edit_project" component={EditProjectForm}/>
                                <Route exact path="/details" component={DetailsPage}/>
                            </Switch>
                        </Grid>                    
                    </Grid>               
            </Router>
        </MuiPickersUtilsProvider>           
        ) 
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    };
  };

export default connect(mapStateToProps)(App)