import React, {Component} from 'react';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {Redirect} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import {createProject, updateProject} from '../actions/projectActions';
import UserForm from './UserForm';

class FormConfirm extends Component {

    state={
        returnToOverview: false
    }

    getCurrentDate = date => {
        let separator = '/'
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();      
        return `${day}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} Time: ${hour}:${minutes}`
    }

    confirmProject = async () => {
        const {values, create, update} = this.props;
        let users = values.users.map(a => a.user);
        if(create){
            await this.props.createProject(values,users)
        }
        if(update){
            await this.props.updateProject(values,users)
        }
        this.setState({returnToOverview: true})
    }
    render(){
        const {values, update, returnStep} = this.props;
        const {returnToOverview} = this.state;
        if(returnToOverview){
            return <Redirect to='/overview'></Redirect> 
        }
        return(      
                <Grid container xs={12}>   
                        <Grid item xs={12} md={8}> 
                        <Typography align='center' variant='h3' style={{padding:40}}>Confirm new project</Typography>
                        </Grid>                 
                        <Paper> 
                            <Grid container xs={12} md={12} textAlign="center" style={{ height: "100%"}}>
                                <Grid item xs={8} md={8} style={{padding:20}}>
                                    <TextField
                                    readonly
                                    fullWidth
                                    value={values.title}
                                    inputProps={{ style: {fontSize: '1.4rem'}, maxLength: 100}}/>
                                </Grid>
                                <Grid container xs={12} md={9}>                  
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
                                <Grid container xs={12} md={3} style={{padding:20}}>
                                    <span>                   
                                    <Typography variant='h6'>Start Date: {this.getCurrentDate(values.startDate)}</Typography>       
                                    <Typography variant='h6'>End Date: {this.getCurrentDate(values.endDate)}</Typography>
                                    {update ? <Typography variant='h6'>Status: {values.status} </Typography> : <React.Fragment/>}
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
                                                color="primary"
                                                onClick={this.confirmProject}>
                                                Confirm
                                            </Button>
                                        </Grid>                              
                                </Grid>                                
                            </Grid>   
                            </Grid>                 
                        </Paper>
                            <Grid container xs={12} md={2}>
                                <Grid item xs={12} md={12} style={{marginLeft:10}}>
                                    <Paper style={{maxHeight:'100%', overflow:'auto'}}>
                                    <Typography align='center' variant='h5'>Added users</Typography>
                                    <List dense style={{maxHeight:'50vh', width: '100%', maxWidth:350}}>
                                        {values.users.map((user) => {
                                            return(       
                                                <UserForm value={user} confirmedUsers={true}/>
                                            )})
                                    }
                                    </List>
                                    </Paper> 
                                </Grid>
                            </Grid>                                             
                </Grid>           
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createProject: (values,users) => {dispatch(createProject(values,users))},
        updateProject: (values,users) => {dispatch(updateProject(values,users))}
    }
}

export default connect(null,mapDispatchToProps)(FormConfirm)