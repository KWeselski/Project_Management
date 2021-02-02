import React, {Component} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"
import { KeyboardDatePicker, TimePicker } from "@material-ui/pickers";
import AddUsersForm from './AddUsersForm'
import Paper from '@material-ui/core/Paper';

class FormCreate extends Component{
 
    render() {
        const {values, handleChange, handleStartDateChange, handleEndDateChange, handleToogle, returnToOverview} = this.props;
        if(values.returnToOverview){
            return <Redirect to='/overview'></Redirect>
        }
        return(       
            <Grid container xs={12}>   
                    <Grid item xs={12} md={8}> 
                    <Typography align='center' variant='h3' style={{padding:40}}>Add new project</Typography>
                    </Grid>                 
                    <form onSubmit={this.props.nextStep} style={{display: 'flex'}}>  
                        <Paper> 
                        <Grid container xs={12} md={12} textAlign="center" style={{ height: "100%" , marginTop: 20}}>
                            <Grid item xs={8} md={8} style={{padding:20}}>
                                <TextField
                                name="title"
                                variant="standard"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                value={values.title}
                                onChange={handleChange}
                                inputProps={{ style: {fontSize: '1.4rem'}}}
                                />
                                </Grid>
                        <Grid container xs={12} md={9}>                  
                                <Grid item xs={12} md={12} style={{padding:20}}>
                                    <TextField
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
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>               
                        <Grid container xs={12} md={3} style={{padding:20}}>
                            <Grid container xs={12} md={12} justify='space-between'>
                                <Grid item>
                                    <Typography varaint='h6'>Add start date</Typography>
                                    <KeyboardDatePicker
                                        error={!values.validate}
                                        
                                        helperText={!values.validate ? "Invalid date" : ''}
                                        value={values.startDate}
                                        placeholder="10/10/2018"
                                        onChange={date => handleStartDateChange(date)}
                                        minDate={new Date()}
                                        format="dd/MM/yyyy"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography varaint='h6'>Start time</Typography>
                                    <TimePicker
                                        id="startTime"
                                        value={values.startDate}
                                        onChange={date => handleStartDateChange(date)}
                                    />
                                </Grid>        
                            </Grid>
                            <Grid container xs={12} md={12} justify='space-between'>
                                    <Grid item>
                                        <Typography varaint='h6'>Add end date</Typography>
                                        <KeyboardDatePicker          
                                            value={values.endDate}
                                            placeholder="10/10/2018"
                                            name="endDate"
                                            onChange={date => handleEndDateChange(date)}
                                            minDate={new Date()}                                        
                                            format="dd/MM/yyyy"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography varaint='h6'>End time</Typography>
                                        <TimePicker
                                            id="endTime"
                                            value={values.endDate}
                                            onChange={date => handleEndDateChange(date)}
                                        />
                                    </Grid>                           
                                </Grid>
                            <Grid container justify='space-between' xs={12} md={12}>
                                    <Grid item>
                                        <Button 
                                            fullWidth
                                            type="submit"                         
                                            variant="contained"
                                            color="primary"
                                            onClick={returnToOverview}>
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
                        <Grid container xs={12} md={4}>
                            <Grid item xs={12} md={12} style={{marginLeft:30}}>
                                <AddUsersForm users={values.users} handleToogle={handleToogle}/>
                            </Grid>  
                        </Grid>
                    </form>                                    
            </Grid>           
        )
    }
}

export default FormCreate