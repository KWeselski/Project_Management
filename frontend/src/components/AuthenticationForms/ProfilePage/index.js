import React, { Component } from "react";

import axios from "axios";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import ProfilePageInfo from "./ProfilePageInfo";

const styles = (theme) => ({
  mainGrid: {
    marginTop: 70,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
  paper: {
    height: "100%",
    overflow: "auto",
  },
  profileGrid: {
    height: 700,
  },
  profileInfoGrid: {
    width: 200,
  },
  aboutInfoGrid: {
    padding: 20,
    marginTop: 30,
  },
  aboutGridItem: {
    height: "80%",
  },
  description: {
    padding: 20,
    wordWrap: "break-word",
  },
});

class ProfilePage extends Component {
  state = {
    firstName: "",
    lastName: "",
    avatar: null,
    description: "",
    age: "",
    sex: "",
    phone: "",
    user_id: "",
  };

  getProfile = () => {
    axios
      .get("/api/profile/data", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        this.setState({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          avatar: res.data.avatar,
          description: res.data.description,
          age: res.data.age,
          sex: res.data.sex,
          phone: res.data.phone,
          user_id: res.data.id,
        });
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const { avatar, firstName, lastName, sex, age, phone } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.mainGrid}
        direction="column"
        alignItems="center"
      >
        <Grid sm={10} md={10} lg={5} xl={5}>
          <Paper variant="outlined" square className={classes.paper}>
            <Grid container className={classes.profileGrid}>
              <Grid item xs={4} className={classes.profileInfoGrid}>
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
                className={classes.aboutInfoGrid}
              >
                <Grid item sm={12} md={12} className={classes.aboutInfoGrid}>
                  <Typography variant="h5">
                    <b>About Me:</b>
                  </Typography>
                  <Typography variant="h6" className={classes.description}>
                    {this.state.description}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-between"
                  md={12}
                >
                <Link to={{ pathname: "/password/reset/"}}>
                <Button variant="contained" fullwidth color="primary">
                  Reset Password
                </Button>
              </Link>
                  <Link to={{ pathname: "/profile/edit/", state: this.state }}>
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
export default withStyles(styles)(ProfilePage);
