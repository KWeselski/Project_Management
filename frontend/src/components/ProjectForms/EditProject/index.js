import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";
import * as project_action from "../../actions/actualProjectActions";

class EditProjectForm extends Component {

  componentDidMount() {
    this.props.getData()
  }

  render() {
    switch (this.props.values.step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.props.nextStep}
            returnToOverview={this.props.returnToOverview}
            handleChange={this.props.handleChange}
            handleStartDateChange={this.props.handleStartDateChange}
            handleEndDateChange={this.props.handleEndDateChange}
            handleToogle={this.props.handleToogle}
            changeUsersData={this.props.changeUsersData}
            values={this.props.values}
            update={true}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.props.returnStep}
            returnToOverview={this.props.returnToOverview}
            changeUsersData={this.props.changeUsersData}
            values={this.props.values}
            update={true}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({
  users_in_project: state.actProj.users,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
      get_project: (project_id) => { dispatch(project_action.getProjectValues(project_id))}
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectForm);
