import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import DatesForm from "./DatesForm";
import AddUsersForm from "./AddUsersForm";
import StatusSelect from "./EditProject/StatusSelect";
import Paper from "@material-ui/core/Paper";
import TitleDescForm from "./TitleDescForm";

class FormCreate extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit = () => {
    this.props.nextStep()
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
    } = this.props;
    if (values.ToOverview) {
      return <Redirect to="/overview"></Redirect>;
    }
    return (
      <Grid container xs={12} style={{ marginLeft: 220 }}>
        <Grid item xs={12} md={4}>
          <Typography align="center" variant="h3" style={{ padding: 40 }}>
            {update ? "Edit project" : "Add new project"}
          </Typography>
        </Grid>
        <Grid item container md={12} spacing={1}>
          <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
            <TitleDescForm
              title = {values.title}
              description ={values.description}
              handleChange={handleChange}
            />
            <Paper variant="outlined" square>
              <Grid container md={4} style={{ padding: 20 }}>
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
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Grid container xs={12} md={4}>
              <Grid item xs={12} md={12} style={{ marginLeft: 30 }}>
                <AddUsersForm
                  update={update}
                  users={values.users}
                  changeUsersData={this.props.changeUsersData}
                  handleToogle={handleToogle}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default (FormCreate);
