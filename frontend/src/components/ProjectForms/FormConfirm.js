import React, {Component} from 'react';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class FormConfirm extends Component {

    getCurrentDate = date => {
        let separator = '/'
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();      
        return `${day}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} Time: ${hour}:${minutes}`
    }

    render(){
        const {values, returnToOverview, returnStep} = this.props;
        if(values.returnToOverview){
            return <Redirect to='/overview'></Redirect>
        }
        return(      
                <Grid container xs={12}>   
                        <Grid item xs={12} md={8}> 
                        <Typography align='center' variant='h3' style={{padding:40}}>Confirm new project</Typography>
                        </Grid>                 
                        <Paper> 
                            <Grid container xs={12} md={8} textAlign="center" style={{ height: "100%" , marginTop: 20}}>
                                <Grid item xs={12} md={12} style={{padding:20}}>
                                    <Typography style={{fontSize: '1.4rem'}}>Title: {values.title}</Typography>
                                </Grid>
                                <Grid container xs={12} md={8}>                  
                                    <Grid item xs={12} md={12} style={{padding:20}}>
                                        <TextField
                                            readonly
                                            name="description"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            value={values.description}
                                            rows={15}
                                            inputProps={{ maxLength: 1000 }}
                                            multiline = {true}
                                        />
                                    </Grid>
                                </Grid>               
                                <Grid container xs={12} md={4} style={{padding:20}}>
                                    <span>                   
                                    <Typography variant='h6'>Start Date: {this.getCurrentDate(values.startDate)}</Typography>       
                                    <Typography variant='h6'>End Date: {this.getCurrentDate(values.endDate)}</Typography>
                                    </span>    
                                <Grid container justify='space-between' xs={12} md={12}>
                                <Grid item>
                                        <Button 
                                        fullWidth
                                        type="submit"                         
                                        variant="contained"
                                        color="primary"
                                        onClick={returnToOverview}
                                        >
                                        Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                            <Button 
                                                fullWidth
                                                type="submit"                         
                                                variant="contained"
                                                color="primary"
                                                onClick={returnStep}
                                                >
                                                Back
                                            </Button>
                                    </Grid>
                                        <Grid item>
                                            <Button
                                                fullWidth
                                                type="submit"                      
                                                variant="contained"
                                                color="primary">
                                                Next
                                            </Button>
                                        </Grid>                              
                                </Grid>                                
                            </Grid>   
                            </Grid>                 
                        </Paper>
                        <Paper>
                            <Grid container xs={12} md={4}>
                                <Grid item>
                                    <Typography align='center' variant='h5'>Added users</Typography>
                                    <List dense style={{maxHeight:'50vh', width: '100', maxWidth:600}}>
                                        {values.users.map((user) => {
                                            const labelId = `checkbox-list-secondary-label-${user.id}`;
                                            return(       
                                                <ListItem key={user.id} button>
                                                    <ListItemAvatar>
                                                        <Avatar alt={user.firstname[0]+user.lastname[0]} style={{backgroundColor:'green'}}></Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText id={labelId} primary={user.firstname +` ` + user.lastname}/>
                                                </ListItem>
                                            )})
                                    }
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>                                     
                </Grid>           
        )
    }
}

export default FormConfirm