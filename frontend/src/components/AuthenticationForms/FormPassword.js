import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom"
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {authSignup, createProfile} from '../actions/authActions.js'


class FormPassword extends Component{
      
    state={
        redirectToLogin:false,
    }

    return = e => {
        e.preventDefault();
        this.props.returnStep();
    }

    handleSubmit = async e => {
        const { values } = this.props;
        e.preventDefault();
        const username = values.firstName + "_" + values.lastName;
        await this.props.signup(
            username,
            values.email,
            values.password1,
            values.password2,  
        )
        await this.props.createProfile(
            values.firstName,
            values.lastName,
            values.sex,
            values.age, 
            values.phone,
        )
        this.setState({redirectToLogin:true})       
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { values, handleChange, error } = this.props;
        const {redirectToLogin} = this.state;
        let errorMessage;

        if(redirectToLogin){
            return <Redirect to="/overview"></Redirect>  
        }
        if(error){
            errorMessage = (<Grid container xs={12}>
                {Object.keys(error).map(function(key) {
                  return <Grid item xs={12}><Typography variant='h7'>{error[key].join(',')}</Typography></Grid>
                })
              }</Grid>);
        }
        return(
            <Grid container xs={12} style={{height:'100%'}}>
            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={4}>
            <Typography align='center' variant="h4">Register your account</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle">
                    <Grid item xs={12} md={12}>
                        <TextField
                            autoComplete='email'
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        autoComplete="current-password"
                        value={values.password1}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password2"
                        label="Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.return}>
                            Back
                        </Button>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            >Sign Up
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="center">          
                    {error ? (
                        <Grid container xs={12}>
                        {errorMessage}
                        </Grid>                      
                    ):(<React.Fragment/>)}   
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Already have an account?
                        </Link>
                    </Grid>
                </Grid>
            </form>
            </Grid>
            <Grid item xs={1} md={3}></Grid>
        </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createProfile: (firstName, lastName, age, sex, phone)=>
        dispatch(createProfile(firstName, lastName, age, sex, phone)),
        signup: (username, email, password1, password2) =>
        dispatch(authSignup(username, email, password1, password2))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(FormPassword);
