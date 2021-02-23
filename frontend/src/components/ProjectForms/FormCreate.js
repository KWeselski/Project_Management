import React, { Component } from "react";

import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

import AddUsersForm from "./AddUsersForm";
import DatesForm from "./DatesForm";
import StatusSelect from "./EditProject/StatusSelect";
import TitleDescForm from "./TitleDescForm";

const styles = (theme) => ({
  mainGrid: {
    minHeight: "70vh",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 220,
    },
  },
  title: {
    padding: 40,
  },
  item: {
    padding: 20,
  },
});

class FormCreate extends Component {
  handleSubmit = () => {
    this.props.nextStep();
  };

  render() {
    const {
      classes,
      values,
      update,
      handleChange,
      handleStartDateChange,
      handleEndDateChange,
      handleToogle,
      returnToOverview,
      changeUsersData,
      checkDate,
    } = this.props;
    if (values.toOverview) {
      return <Redirect to="/overview"></Redirect>;
    }
    return (
      <Grid className={classes.mainGrid} container xs={12}>
        <Grid item xs={12}>
          <Typography align="center" variant="h3" className={classes.title}>
            {update ? "Edit project" : "Add new project"}
          </Typography>
        </Grid>
        <form onSubmit={this.handleSubmit}>
          <Grid item container xs={12} spacing={1} direction={"row"}>
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
                <Grid container md={12} className={classes.item}>
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
                        disabled={!values.validate}
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
      </Grid>
    );
  }
}
export default withStyles(styles)(FormCreate);
