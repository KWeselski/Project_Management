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
import axios from 'axios'

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
        loaded:false,
        comments:[]
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

    getComments = (id) => {
        axios.get(`/api/get_comments/${id}`)
        .then(res => {
            this.setState({ 
                comments: res.data
             })
        })
    }

    componentDidMount() {
        const { data } = this.props.location.data;
        this.getComments(data.id)
    }

    render(){
    const {loaded,comments} = this.state;
    const {profiles} = this.props;
    const { data } = this.props.location.data;
    if(data.users.length > 0 && loaded==false && profiles.length > 0){
        this.changeUsersData()
    }
    return(   
        <Grid container xs={12}>
            <Grid container xs={6}>
            <Paper style={{marginTop:20}}>
            <Grid item xs={10} style={{padding:20}}>
                <span>
                <Typography variant='h5'>{data.title}</Typography>
                <Typography variant='h5'>{data.creator}</Typography>
                </span>
            </Grid>
            <Grid item xs={2} style={{padding:20}}>
                <Status type={data.status}>{data.status}</Status>
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
            </Grid>  
            <Grid container xs={12} md={2}>
                <Grid item xs={12} md={12} style={{marginLeft:10}}>
                     <Paper style={{maxHeight:'100%', overflow:'auto', marginTop:20}}>
                     <Typography align='center' variant='h5'>Users</Typography>
                     <List dense style={{maxHeight:'50vh', width: '100%', maxWidth:350}}>
                     {data.users.map((user) => {
                    const labelId = `checkbox-list-secondary-label-${user.id}`;
                    console.log(user)
                    return(       
                            <ListItem key={user.id} button>
                                <ListItemAvatar>
                                    <Avatar src={user.avatar} style={{backgroundColor:'green'}} ></Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={user.firstname +` ` + user.lastname}/>
                            </ListItem>
                )})
               }
                     </List>
                    </Paper> 
                    </Grid>
            </Grid>
            <Grid container xs={12} md={4} style={{padding:20}}>
                     <Grid item xs={12} md={12} style={{marginLeft:10}}>
                     <Paper style={{maxHeight:'100%', overflow:'auto', }}>
                     <Typography align='center' variant='h5'>Comments</Typography>
                     <List dense style={{maxHeight:'50vh', width: '100%', maxWidth:350}}>
                        {comments.map((comment) => {
                            console.log(comment)
                            const labelId = `checkbox-list-secondary-label-${comment.id}`;
                            return(       
                                <ListItem key={comment.id} button>
                                    <ListItemAvatar>
                                        <Avatar src={comment.profile.avatar} style={{backgroundColor:'green'}}></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} 
                                    primary={
                                        <React.Fragment>
                                        <Typography variant='h6'>{comment.profile.firstname+' '+comment.profile.lastname}</Typography>
                                        {data.creator == comment.user ? <Typography variant='h7'>Creator</Typography>: <React.Fragment></React.Fragment>}
                                        </React.Fragment>           
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography variant='h7'>{comment.comment}</Typography>
                                        </React.Fragment>   
                                    }/>
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