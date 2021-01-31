import React, { Component} from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from
'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Overview from './Overview';
import RegistrationForm from './AuthenticationForms/RegistrationForm'
import Grid from '@material-ui/core/Grid';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                    <Sidebar/> 
                    <Grid container md={12}>
                        <Grid item md={2}>
                            
                        </Grid>
                        <Grid container md={10}>
                            <Switch>
                                <Route exact path="/" component={RegistrationForm}/>
                            </Switch>
                        </Grid>
                        
                    </Grid>               
            </Router>
                   
        ) 
    }
}

const appDiv = document.getElementById('app')
render(<App/>, appDiv)