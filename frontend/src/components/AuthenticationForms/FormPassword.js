import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom"
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {authSignup, createProfile} from '../actions/authActions.js'
import Paper from '@material-ui/core/Paper';

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
            <Grid container direction='column' alignItems="center" justify="center" style={{minHeight:'70vh'}}>
            <Grid item xs={10} md={3}>
            <Paper variant="outlined" square>
            <Typography align='center' style={{marginTop:'5vh'}} variant="h4">Register your account</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} justify="center" style={{marginTop:'2vh', padding:20, height: "100%"}}
                verticalAlign="middle">
                    <Grid item xs={12} md={10}>
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
                            style={{backgroundColor:'lightgray'}}
                            onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={10}>
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
                        style={{backgroundColor:'lightgray'}}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={10}>
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
                        style={{backgroundColor:'lightgray'}}
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
                </Grid>
            </form>
            </Paper>
            <Paper variant="outlined" square style={{marginTop:20}}>
                <Grid container style={{padding:20}} justify='center'>
                    <Link style={{textDecoration:'none'}} to="/login" >
                        Already have an account?
                    </Link>
                 </Grid>
            </Paper>
            </Grid>
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
        createProfile: (firstName, lastName, age, sex, phone)=>
        dispatch(createProfile(firstName, lastName, age, sex, phone)),
        signup: (username, email, password1, password2) =>
        dispatch(authSignup(username, email, password1, password2))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(FormPassword);
