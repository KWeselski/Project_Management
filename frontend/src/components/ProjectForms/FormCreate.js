import React, { Component } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import DatesForm from "./DatesForm";
import AddUsersForm from "./AddUsersForm";
import { connect } from "react-redux";
import StatusSelect from "./EditProject/StatusSelect";
import Paper from "@material-ui/core/Paper";
import TitleDescForm from "./TitleDescForm";
import * as project_action from "../actions/actualProjectActions";
class FormCreate extends Component {
  constructor(props){
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit = () => {
    const {title, description} = this.formRef.current.state
    this.props.applyTitleDesc(title,description)
    this.props.nextStep()
  };

  render() {
    const {
      values,
      update,
      handleChange,
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
              ref ={this.formRef}
              values = {{'title': this.props.title, 'description': this.props.description}}
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
                  startDate={this.props.startDate}
                  endDate={this.props.endDate}
                  validate={this.props.validate}
                  handleStartDateChange={this.props.changeStartDate}
                  handleEndDateChange={this.props.changeEndDate}
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
                  users={this.props.users}
                  changeUsersData={this.props.changeUsersData}
                  handleToogle={this.props.toogleUser}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.project.profiles,
    title: state.actProj.title,
    description: state.actProj.description,
    startDate: state.actProj.startDate,
    endDate: state.actProj.endDate,
    users: state.actProj.users,
    validate: state.actProj.validate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeStartDate: (date) => dispatch(project_action.changeStartDate(date)),
    changeEndDate: (date) => dispatch(project_action.changeEndDate(date)),
    toogleUser: (user) => {
      dispatch(project_action.toogleUser(user));
    },
    changeUsersData: (profiles) => {
      dispatch(project_action.changeUsersData(profiles));
    },
    applyTitleDesc : (title, description) => {
      dispatch(project_action.applyTitleDesc(title,description))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCreate);
