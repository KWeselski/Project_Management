import React, {Component} from 'react';
import {Link,} from "react-router-dom"
import {Button, Grid, TextField , Typography, MenuItem} from '@material-ui/core';


class FormPersonalInfo extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render(){    
        const { values, handleChange } = this.props;

        return(
            <Grid container xs={12} style={{height:'100%'}}>
            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={4}>
            <Typography align='center' variant="h4">Type your personal info</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle">
                    <Grid item xs={12} md={12}>
                        <TextField
                            autoComplete='firstName'
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            inputProps={{pattern:"[A-Za-z]{1,50}"}}
                            value={values.firstName}
                            onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="lastName"
                            label="Last Name"
                            id="lastName"
                            inputProps={{pattern:"[A-Za-z]{1,50}"}}
                            value={values.lastName}
                            onChange={handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            select
                            required
                            fullWidth
                            name="sex"
                            label="Sex"
                            id="sex"
                            value={values.sex}
                            onChange={handleChange}
                        >
                        <MenuItem value="none" disabled>
                            Sex
                         </MenuItem>
                         <MenuItem value={'male'}>Male</MenuItem>
                         <MenuItem value={'female'}>Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="age"
                            label="Age"
                            id="age"
                            inputProps={{pattern:"[0-9]{2}", maxLength:2}}
                            maxLength="2"
                            value={values.age}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            id="phone"
                            inputProps={{pattern:"[0-9]{9}", maxLength:9}}
                            value={values.phone}
                            onChange={handleChange}
                        />
                    </Grid>  
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        Continue
                    </Button>
                </Grid>
                <Grid container justify="center">
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

export default FormPersonalInfo