import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from "react-router-dom"
import {authLogin} from './actions/authActions.js'
import {Button, Grid, TextField , Typography} from '@material-ui/core';

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.login(email, password);
    }

    render() {
        const {email, password} = this.props;
        return(
            <h1>Login</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login:(email, password) => dispatch(authLogin(email, password))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);