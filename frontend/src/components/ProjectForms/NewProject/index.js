import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";

class CreateProjectForm extends Component {
  state = {
    ToOverview: false,
  };

  componentDidMount() {
    this.props.newState();
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
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.props.returnStep}
            returnToOverview={this.props.returnToOverview}
            values={this.props.values}
            create={true}
          />
        );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanState: () => {
      dispatch(project_action.createProjectStart());
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateProjectForm);
