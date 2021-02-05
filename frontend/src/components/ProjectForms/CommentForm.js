import React, { Component} from 'react'
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';


class CommentForm extends Component{

    state={
        comment:'',
    }

    handleSubmit = e => {
        e.preventDefault();
        const {comment} = this.state;
        const {id} = this.props.location.data;
        this.createComment(comment,id);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createComment = (comment,id) => {
        axios.post('/api/create_comment/',{
            comment:comment,
            project: id
        },{
        headers: {Authorization: `${localStorage.getItem("token")}`}
        })
    }


    render(){
        const {comment} = this.state;
        return (
            <Grid container xs={8}>
            <Grid item xs={10}>
            <Typography style={{padding:10 ,marginTop:10, textAlign:'center'}} variant="h6">Comment</Typography>
            <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2} textAlign="center"
            verticalAlign="middle">
                <Grid item xs={12}>
                    <TextField
                        autoComplete='comment'
                        name="comment"
                        variant="outlined"
                        fullWidth
                        multiline={true}
                        rows={4}
                        id="comment"
                        label="Comment"
                        autoFocus
                        value={comment}
                        inputProps={{ maxLength: 250 }}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid container justify='space-between' xs={12} md={12}>
                                    <Grid item>
                                        <Button 
                                            fullWidth
                                            type="submit"                         
                                            variant="contained"
                                            color="primary"
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
            </form>
            </Grid>
            </Grid>                                           
        )
}
}

export default CommentForm;