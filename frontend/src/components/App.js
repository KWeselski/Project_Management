import React, { Component} from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from
'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Overview from './Overview';
import RegistrationForm from './AuthenticationForms/RegistrationForm';
import LoginForm from './AuthenticationForms/LoginForm';
import CreateProjectForm from './ProjectForms/CreateProjectForm';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
                    <Sidebar/> 
                    <Grid container md={12}>
                        <Grid item md={2}>                      
                        </Grid>
                        <Grid container md={10}>
                            <Switch>
                                <Route exact path="/" component={LoginForm}/>
                                <Route exact path="/register" component={RegistrationForm}/>
                                <Route exact path='/overview' component={Overview}/>
                                <Route exact path="/create_project" component={CreateProjectForm}/>
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