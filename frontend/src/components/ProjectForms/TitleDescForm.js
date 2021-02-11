import React, {Component} from "react";
import {
    Grid,
    TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


export default class TitleDescForm extends Component{ 
  
    state = {
      title: "",
      description: "",
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    componentDidUpdate(prevProps){
      if(prevProps.values.title !== this.props.values.title){
        console.log('hello')
        this.setState({title: this.props.values.title, description: this.props.values.description})
      }
      
    }

    render(){
    return(
        <Paper variant="outlined" square>
            <Grid
              container
              xs={12}
              md={12}
              textAlign="center"
              justify="space-between"
              style={{ height: "100%", marginTop: 20 }}
            >
              <Grid item xs={8} md={12} style={{ padding: 20 }}>
                <TextField
                  name="title"
                  variant="standard"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  inputProps={{ maxLength: 100, style: { fontSize: "1.4rem" } }}
                />
              </Grid>
              <Grid item xs={12} md={12} style={{ padding: 20 }}>
                  <TextField
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    value={this.state.description}
                    rows={15}
                    inputProps={{ maxLength: 1000 }}
                    multiline={true}
                    onChange={this.handleChange}
                  />            
              </Grid>          
            </Grid>
        </Paper>
    )
    }
}