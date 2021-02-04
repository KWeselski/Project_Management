import React, { Component} from 'react';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';

const Status = styled.div `
    background: ${props =>
        (props.type === 'new' && 'lightblue') || 
        (props.type === 'active' && 'yellow') ||
        (props.type === 'canceled' && 'red')
    };  
    text-align: center;
    border-radius: 30px;
    width: 75%;
    margin: 0 auto;
    font-weight: bold;
    text-transform: capitalize;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

class DetailsPage extends Component {

    state = {
        loaded:false
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

    changeUsersData = () => {
        const {profiles} = this.props;
        const {data} = this.props.location.data;
        const users_in_project = []
        data.users.map((user) => {
            let index = profiles.findIndex(x => x.user == user)
            users_in_project.push(profiles[index])
            }
        )
        data.users.length = 0;
        this.props.location.data.data.users = [...users_in_project];
        this.setState({loaded:true})
        
    }

    componentDidMount() {
        const { data } = this.props.location.data;
        this.setState({ 
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
         })
    }

    render(){
    const {loaded} = this.state;
    const {profiles} = this.props;
    const { data } = this.props.location.data;

    if(data.users.length > 0 && loaded==false && profiles.length > 0){
        this.changeUsersData()
    }
    return(
        
        <Grid container xs={12}>
            <Paper style={{marginTop:20}}>
            <Grid container xs={12}>
            <Grid item xs={10} style={{padding:20}}>
                <Typography variant='h5'>{data.title}</Typography>
            </Grid>
            <Grid item xs={2} style={{padding:20}}>
                <Status type={data.status}>{data.status}</Status>
            </Grid>
            </Grid>
            <Grid item xs={12} md={12} style={{padding:20}}>
                <TextField
                readonly
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                value={data.description}
                rows={15}
                inputProps={{ maxLength: 1000 }}
                multiline = {true}/>
            </Grid>
            <Grid container xs={12} md={6} style={{padding:20}} jutify="space-between">                  
            <Typography variant='h6'>Start Date: {this.getCurrentDate(new Date(data.start_date))}</Typography>       
            <Typography variant='h6'>End Date: {this.getCurrentDate(new Date(data.end_date))}</Typography>
            </Grid>
            </Paper>   
            <Grid container xs={12} md={2}>
                     <Grid item xs={12} md={12} style={{marginLeft:10}}>
                     <Paper style={{maxHeight:'100%', overflow:'auto'}}>
                     <Typography align='center' variant='h5'>Users</Typography>
                     <List dense style={{maxHeight:'50vh', width: '100%', maxWidth:350}}>
                     {data.users.map((user) => {
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
        </Paper> 
    </Grid>
    </Grid>
        </Grid>
    )
    } 
}
const mapStateToProps = state => ({
    profiles: state.project.profiles,
    loading: state.project.loading,
    error: state.project.error
});

export default connect(mapStateToProps)(DetailsPage)