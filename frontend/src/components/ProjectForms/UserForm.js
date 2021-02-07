import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ProfileDialog from './ProfileDialog'

export default function UserForm(props){

    const [openDialog, setOpenDialog] = useState(false)
    const {value, users, handleToogle, confirmedUsers} = props;
    const labelId = `checkbox-list-secondary-label-${value.id}`;

    const open = () => {
        setOpenDialog(true)
    }

    if(confirmedUsers){
        return(
            <React.Fragment>
            <ListItem key={value.id} button onClick={open}>
                <ListItemAvatar>
                    <Avatar src={value.avatar} style={{backgroundColor:'green'}}></Avatar>
                 </ListItemAvatar>
                <ListItemText id={labelId} primary={value.firstname +` ` + value.lastname}/>
            </ListItem>
            <ProfileDialog openDialog={openDialog} setOpenDialog={setOpenDialog} data={value}/> 
            </React.Fragment>
        )
    } 
    else{
        console.log(users)
    return(
            <React.Fragment>
                <ListItem key={value.id} button onClick={open}>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor:'green'}} alt={value.firstname} src={value.avatar}></Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.firstname +` ` + value.lastname}/>
                        <ListItemSecondaryAction>
                                <Checkbox
                                    edge='end'
                                    onChange={handleToogle(value)}
                                    checked={users.map((v) => {
                                        return (v.id)}).indexOf(value.id) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                        </ListItemSecondaryAction>
                    </ListItem>         
                <ProfileDialog openDialog={openDialog} setOpenDialog={setOpenDialog} data={value}/>   
            </React.Fragment>
        )
    }
}