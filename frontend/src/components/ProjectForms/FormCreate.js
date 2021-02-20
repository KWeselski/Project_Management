import React, { Component } from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import AddUsersForm from "./AddUsersForm";
import DatesForm from "./DatesForm";
import StatusSelect from "./EditProject/StatusSelect";
import TitleDescForm from "./TitleDescForm";
import {MainGrid} from "../styles"

export default class FormCreate extends Component {
  handleSubmit = () => {
    this.props.nextStep();
  };

  render() {
    const {
      values,
      update,
      handleChange,
      handleStartDateChange,
      handleEndDateChange,
      handleToogle,
      returnToOverview,
      changeUsersData,
      checkDate
    } = this.props;
    if (values.toOverview) {
      return <Redirect to="/overview"></Redirect>;
    }
    return (
      <MainGrid container xs={12}>
        <Grid item xs={12}>
          <Typography align="center" variant="h3" style={{ padding: 40 }}>
            {update ? "Edit project" : "Add new project"}
          </Typography>
        </Grid>
        <form onSubmit={this.handleSubmit}>
        <Grid item container xs={12} spacing={1} style={{display: 'flex' }}>   
            <Grid item sm={12} md={8} lg={5}>
              <TitleDescForm
                title={values.title}
                description={values.description}
                handleChange={handleChange}
              />
            </Grid>
            <Grid container sm={12} md={4} lg={3}>
              <Grid item xs={12}>
                <AddUsersForm
                  update={update}
                  users={values.users}
                  changeUsersData={changeUsersData}
                  handleToogle={handleToogle}
                />
              </Grid>
            </Grid>
            <Grid item sm={12} md={12} lg={4}>
              <Paper variant="outlined" square>
                <Grid container md={12} style={{ padding: 20 }}>
                  {update ? (
                    <StatusSelect
                      status={values.status}
                      handleChange={handleChange}
                    />
                  ) : (
                    <React.Fragment />
                  )}

                  <DatesForm
                    startDate={values.startDate}
                    endDate={values.endDate}
                    validate={values.validate}
                    checkDate={checkDate}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                  />
                  <Grid container xs={12} md={12} justify="space-between">
                    <Grid item>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={returnToOverview}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!values.validate && !update}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>       
        </Grid>
        </form>
      </MainGrid>
    );
  }
}
