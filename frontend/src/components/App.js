import React, { Component} from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from
'react-router-dom'
import Sidebar from './Sidebar/Sidebar'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <Sidebar/> 
            </Router>
                   
        ) 
    }
}

const appDiv = document.getElementById('app')
render(<App/>, appDiv)