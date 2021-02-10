import Avatar from "@material-ui/core/Avatar";
import {Grid,Typography } from "@material-ui/core";
import React from "react";

export default function ProfilePageInfo(props){

    return(  
              <Grid
                container
                direction="column"
                alignItems="center"
                md={4}
                style={{ borderRight: "1px solid gray" }}
              >
                <Avatar
                  style={{ height: 150, width: 150, marginTop: 20 }}
                  src={props.avatar}
                />
                <Typography variant="h4" style={{ padding: 20 }}>
                  <b>{props.firstName + " " + props.lastName}</b>
                </Typography>
                <Grid container alignItem="flex-start">
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Sex:</b> {props.sex}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Age:</b> {props.age}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ padding: 20 }}>
                      <b>Phone:</b> {props.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
    )
}