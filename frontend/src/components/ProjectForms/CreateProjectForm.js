import React, { Component } from "react";
import FormConfirm from "./FormConfirm";
import FormCreate from "./FormCreate";
import {nextStep, returnStep, returnToOverview,
handleChange, handleStartDateChange, handleEndDateChange,
changeUsersData, handleToogle, getCurrentDate} from "./ProjectsMethods"

class CreateProjectForm extends Component {
  state = {
    step: 1,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    users: [],
    ToOverview: false,
    validate: false,
  };

  render() {
    const { step } = this.state;

    switch (step) {
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
            values={this.state}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={returnStep}
            returnToOverview={returnToOverview}
            values={this.state}
            create={true}
          />
        );
    }
  }
}
export default CreateProjectForm;
