import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import * as project_action from "../../actions/actualProjectActions";
import { connect } from "react-redux";

class CreateProjectForm extends Component {
  state = {
    ToOverview: false,
    loaded: false,
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) {
      return <h1>Loading</h1>;
    }

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
