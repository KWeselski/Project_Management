import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink, Redirect} from "react-router-dom"
import {authLogin} from '../actions/authActions';
import {Button, Grid, TextField,Typography } from '@material-ui/core';


class LoginForm extends React.Component {
  
    state = {
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
      };

    render() {
        const {token} = this.props;
        const {email, password} = this.props;

        if(token) {
            return <Redirect to="/overview"></Redirect>
        }

        return(
            <Grid container xs={12} style={{height:'100%'}}>
            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={4}>
            <Typography align='center' variant="h4">Login to your account</Typography>
            <form onSubmit={this.handleSubmit} >
                <Grid container spacing={2} textAlign="center" style={{ height: "100%"}}
                verticalAlign="middle">         
                    <Grid item xs={12} md={12}>
                        <TextField
                            autoComplete='email'
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoFocus
                            value={email}
                            onChange={this.handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        Login
                        </Button>
                    </Grid>
                 </Grid>               
                <Grid container justify="space-around">
                    <Grid item>
                            <Link to="/register" variant="body2">
                                Create account
                            </Link>
                    </Grid>
                    <Grid item>
                            <Link to="/reset_password/" variant="body2">
                                Reset password
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
      login: (email, password) => dispatch(authLogin(email, password))
    };
};
 
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);