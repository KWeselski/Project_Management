import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  state = {
    firstName: "",
    lastName: "",
    avatar: "",
    description: "",
    age: "",
    sex: "",
    phone: "",
    user_id: "",
  };

  getProfile = () => {
    axios
      .get("/api/profile_data", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        this.setState({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          avatar: res.data.avatar,
          description: res.data.description,
          age: res.data.age,
          sex: res.data.sex,
          phone: res.data.phone,
          user_id: res.data.user
        });
      })
      .catch((error) => {
        return error;
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item md={4} style={{ marginTop: 100, width: "100%" }}>
          <Paper variant="outlined" square style={{ height: "100%" }}>
            <Grid container style={{ height: 600 }}>
              <Grid
                container
                direction="column"
                alignItems="center"
                md={4}
                style={{ borderRight: "1px solid gray" }}
              >
                <Avatar
                  style={{ height: 200, width: 200, marginTop: 20 }}
                  src={this.state.avatar}
                />
                <Typography variant="h4" style={{ padding: 20 }}>
                  <b>{this.state.firstName + " " + this.state.lastName}</b>
                </Typography>
                <Grid container alignItem="flex-start">
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Sex:</b> {this.state.sex}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Age:</b> {this.state.age}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Phone:</b> {this.state.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                md={8}
                direction="row"
                wrap="wrap"
                style={{ padding: 20, marginTop:30 }}
              >
                <Grid item md={12} style={{height:'80%'}}>
                  <Typography variant="h5">
                    <b>About Me:</b>
                  </Typography>
                  <Typography variant="h6">{this.state.description}</Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify='center'
                  md={12}
                >
                <Link to={{pathname:'/edit_profile/', state: this.state }}>
                  <Button  variant="contained" fullwidth color="primary">
                    Edit profile
                  </Button>
                </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default ProfilePage;
