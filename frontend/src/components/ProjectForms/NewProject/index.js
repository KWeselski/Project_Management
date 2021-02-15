import React, { Component } from "react";

import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";

export default class CreateProjectForm extends Component {
  componentDidMount() {
    this.props.newState();
  }

  render() {
    const {
      nextStep,
      returnStep,
      returnToOverview,
      handleChange,
      handleStartDateChange,
      handleEndDateChange,
      handleToogle,
      changeUsersData,
      values,
    } = this.props;
    switch (values.step) {
      case 1:
        return (
          <FormCreate
            nextStep={nextStep}
            returnToOverview={returnToOverview}
            handleChange={handleChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleToogle={handleToogle}
            changeUsersData={changeUsersData}
            values={values}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={returnStep}
            returnToOverview={returnToOverview}
            values={values}
            create={true}
          />
        );
    }
  }
}
