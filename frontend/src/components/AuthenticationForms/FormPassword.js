import React, {Component} from 'react';
import {Link,} from "react-router-dom"
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {authSignup} from '../actions/authActions.js'

class FormPassword extends Component{
       
    return = e => {
        e.preventDefault();
        this.props.returnStep();
    }

    handleSubmit = e => {
        const { values } = this.props;
        e.preventDefault();
        this.props.signup(
            values.firstName,
            values.lastName,
            values.age,
            values.sex,
            values.phone,
            values.email,
            values.password1,
            values.password2
            )
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { values, handleChange, error } = this.props;
        let errorMessage;
        if(error){
            errorMessage = (<Grid container xs={12}>
                {Object.keys(error).map(function(key) {
                  return <Grid item xs={12}><Typography variant='h7'>{error[key].join(',')}</Typography></Grid>
                })
              }</Grid>);
        }
        console.log(errorMessage)
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
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signup: (firstName, lastName, age, sex, phone, email, password1, password2) =>
        dispatch(authSignup(firstName, lastName, age, sex, phone, email, password1, password2))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(FormPassword);
