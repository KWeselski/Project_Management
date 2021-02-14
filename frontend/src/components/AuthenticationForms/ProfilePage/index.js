import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import ProfilePageInfo from "./ProfilePageInfo";
import { Link } from "react-router-dom";
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
        return error;
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const { avatar, firstName, lastName, sex, age, phone } = this.state;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid container item md={4} style={{ marginTop: 100, width: "100%" }}>
          <Paper variant="outlined" square style={{ height: "100%" }}>
            <Grid container item style={{ height: 600 }}>
              <Grid
                container
                direction="column"

                md={1}
                style={{ borderRight: "1px solid gray" }}
              >
              <Grid item>
                <ProfilePageInfo
                  avatar={avatar}
                  firstName={firstName}
                  lastName={lastName}
                  sex={sex}
                  age={age}
                  phone={phone}
                />
                </Grid>
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
                <Grid container alignItems="center" justify="center" md={12}>
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
