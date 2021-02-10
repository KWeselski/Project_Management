import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";

class EditProjectForm extends Component {
  state = {
    step: 1,
    returnToOverview: false,
    validate: false,
  };

  componentDidMount() {
    const {project_id,projects} = this.props;
    this.props.loadState(project_id,projects );
    /*
    const data = JSON.parse(localStorage.getItem("/edit_project/"));
    this.setState({
      title: data.title,
      description: data.description,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      users: data.users,
      status: data.status,
      project_id: data.id,
      creator: data.creator,
    });
    */
  }

  render() {
    const { step } = this.state;
    
    switch (step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.nextStep}
            returnToOverview={this.returnToOverview}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleToogle={this.handleToogle}
            changeUsersData={this.changeUsersData}
            values={this.state}
            update={true}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.returnStep}
            returnToOverview={this.returnToOverview}
            values={this.state}
            update={true}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({
  projects: state.project.projects
});

const mapDispatchToProps = (dispatch) => {
  return {
      loadState: (project_id, projects) => {
        dispatch(project_action.editProjectStart(project_id, projects))
      }
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectForm);
