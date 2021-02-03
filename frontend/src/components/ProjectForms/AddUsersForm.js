import React, { Component} from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

class AddUserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            profiles: [],
            loaded: false
        }      
    }
    
    getUsers = () => {
        axios.get('/api/get_users_list/'   
        ).then(res => {
            this.setState({profiles : res.data})
        }).then(this.sortProfiles)
        .catch(error => console.log(error.message) )
    }

    sortProfiles = () => {
        const {profiles} = this.state;
        profiles.sort((a,b) => (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0))
    }


    componentDidMount () {
        this.getUsers()      
    }
    changeUsersData = () => {
        if(this.props.update){
            const {profiles} = this.state;
            const {users} = this.props;
            const users_in_project = []
            console.log("USERS", profiles)
            users.map((user) => {
                console.log(user)
                let index = profiles.findIndex(x => x.user == user)
                console.log(index)
                users_in_project.push(profiles[index])
                }
            )
            console.log(users_in_project)
            users.length = 0;
            this.props.users = [...users_in_project];
            this.setState({loaded:true})
        }
    }

    render(){
        const {profiles,loaded} = this.state;
        const {users} = this.props;
        
        if(users.length > 0 && loaded==false && profiles.length > 0){
            console.log('Użytkownicy', users)
            console.log('Wykonało')
            this.changeUsersData()
        }
        console.log('user', users)
        return(
            <Paper style={{maxHeight:'100%', overflow:'auto'}}>
            <Typography align='center' variant='h5'>Add users to project</Typography>
            <List dense style={{maxHeight:'50vh',width: '100%', maxWidth:600}}>
                {profiles.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                    return (
                      <ListItem key={value.id} button>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor:'green'}}>{value.firstname[0]+value.lastname[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={value.firstname +` ` + value.lastname}/>
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge='end'
                                onChange={this.props.handleToogle(value)}
                                checked={users.map((v) => {return v.id}).indexOf(value.id) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                      </ListItem>    
                    )
                })}
            </List>
            </Paper>
        )
    }
}

export default AddUserForm