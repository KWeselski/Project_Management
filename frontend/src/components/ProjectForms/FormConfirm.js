import React, {Component} from 'react';
import {Button, Grid, TextField , Typography} from '@material-ui/core';

class FormConfirm extends Component {

    render(){
        const {values} = this.props;
        console.log(values)
        return(
            <Grid container xs={12} md={10}>
                <Typography variant='h6'>{values.title}</Typography>
                <Typography variant='h6'>{values.description}</Typography>
                <Typography variant='h6'>{values.startDate.getDate()}</Typography>
                <Typography variant='h6'>{values.endDate.getDate()}</Typography>
                {values.users.map(user => {
                    return (
                        <Typography variant='h7'>{user.firstname}</Typography>
                    )
                })}              
            </Grid>
        )
    }
}

export default FormConfirm