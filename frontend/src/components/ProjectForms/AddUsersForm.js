import React, { Component} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';

class AddUserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }      
    }

    changeUsersData = () => {
        if(this.props.update){
            const {profiles} = this.props;
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
        const {loaded} = this.state;
        const {users, profiles} = this.props;
        console.log(profiles)
        if(users.length > 0 && loaded==false && profiles.length > 0){
            this.changeUsersData()
        }
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

const mapStateToProps = state => ({
    profiles: state.project.profiles,
    loading: state.project.loading,
    error: state.project.error
});

export default connect(mapStateToProps)(AddUserForm)