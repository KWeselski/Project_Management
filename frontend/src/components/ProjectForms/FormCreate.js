import React, {Component} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"
import { KeyboardDatePicker } from "@material-ui/pickers";
import AddUsersForm from './AddUsersForm'

class FormCreate extends Component{
 
    render() {
        const {values, handleChange, handleStartDateChange, handleEndDateChange, handleToogle} = this.props;
        return(          
            <Grid container xs={12} style={{height:'100%'}}>   
                    <Grid item xs={12} md={12}>
                    <Typography variant='h4'>Add new project</Typography>
                    </Grid>     
                    <form onSubmit={this.handleSubmit} style={{display: 'flex'}}>
                        <Grid container xs={12} md={6} spacing={1} textAlign="center" style={{ height: "100%" , marginTop: 20}}>      
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                value={values.title}
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                value={values.description}
                                rows={10}
                                inputProps={{ maxLength: 1000 }}
                                multiline = {true}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid container xs={12} md={6}>
                            <Grid item xs={12} md={6}>
                                <Typography varaint='h6'>Add start date</Typography>
                                <KeyboardDatePicker
                                    clearable
                                    value={values.startDate}
                                    placeholder="10/10/2018"
                                    onChange={date => handleStartDateChange(date)}
                                    minDate={new Date()}
                                    margin="normal"
                                    format="dd/MM/yyyy"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="startTime"
                                    label="Start time"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>        
                        </Grid>
                        <Grid container xs={12} md={6}>
                            <Grid item xs={12} md={6}>
                                <Typography varaint='h6'>Add end date</Typography>
                                <KeyboardDatePicker
                                    clearable
                                    value={values.endDate}
                                    placeholder="10/10/2018"
                                    name="endDate"
                                    onChange={date => handleEndDateChange(date)}
                                    minDate={new Date()}
                                    margin="normal"
                                    format="dd/MM/yyyy"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="endTime"
                                    label="End time"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>                           
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.props.nextStep}
                                >
                                Next
                            </Button>
                        </Grid>                 
                        </Grid>
                        <Grid container xs={12} md={6}>
                            <Grid item xs={12} md={12} style={{marginLeft:30}}>
                                <AddUsersForm users={values.users} handleToogle={handleToogle}/>
                            </Grid>  
                        </Grid>
                    </form>
                    <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.return}>
                                Back
                            </Button>
                    </Grid>
                </Grid>
        )
    }
}

export default FormCreate