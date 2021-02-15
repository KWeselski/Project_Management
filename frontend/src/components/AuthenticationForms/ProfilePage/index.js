import React, { Component } from "react";

import axios from "axios";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import ProfilePageInfo from "./ProfilePageInfo";
import { MainTypography } from "./styles";

export default class ProfilePage extends Component {
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
          user_id: res.data.user,
        });
      })
      .catch((error) => {
        return error.reponse.data;
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const { avatar, firstName, lastName, sex, age, phone } = this.state;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item sm={8} md={7} lg={5} xl={5} style={{marginLeft:220, marginTop: 70, width: "100%" }}>
          <Paper
            variant="outlined"
            square
            style={{ height: "100%", overflow: "auto" }}
          >
            <Grid container style={{ height: 700 }}>
              <Grid item xs={4} style={{minWidth:200}}>
                <ProfilePageInfo
                  avatar={avatar}
                  firstName={firstName}
                  lastName={lastName}
                  sex={sex}
                  age={age}
                  phone={phone}
                />
              </Grid>
              <Grid
                item
                container
                md={8}
                direction="row"
                style={{ padding: 20, marginTop: 30 }}
              >
                <Grid item md={12} style={{ height: "80%" }}>
                  <Typography variant="h5">
                    <b>About Me:</b>
                  </Typography>
                  <MainTypography variant="h6">
                    {this.state.description}
                  </MainTypography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  md={12}
                >
                  <Link to={{ pathname: "/edit_profile/", state: this.state }}>
                    <Button variant="contained" fullwidth color="primary">
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
