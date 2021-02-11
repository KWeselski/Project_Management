import React, { Component } from "react";
import CreateProjectForm from './NewProject/index'
import EditProjectForm from './EditProject/index'

export default class ProjectForm extends Component {
state = {
    step: 1,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    users: [],
    status: "",
    project_id: null,
    returnToOverview: false,
    validate: false,  
};

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  returnStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  returnToOverview = () => {
    this.setState({ returnToOverview: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkDate = () => {
    const { startDate, endDate, validate } = this.state;
    if (startDate > endDate) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  handleStartDateChange = (date) => {
    this.setState({ startDate: date }, () => {
      this.checkDate();
    });
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date }, () => {
      this.checkDate();
    });
  };

  checkDate = () => {
    const { startDate, endDate, } = this.state;
    if (startDate > endDate) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  handleToogle = (value) => () => {
    const { users } = this.state;
    const currentIndex = users
      .map((v) => {
        return v.id;
      })
      .indexOf(value.id);
    const newChecked = [...users];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ users: newChecked });
  };

  changeUsersData = () => {
    if (!this.state.users.some((i) => !Number.isInteger(i))) {
      const { profiles } = this.props;
      const users_in_project = [];
      this.state.users.map((user) => {
        let index = profiles.findIndex((x) => x.user == user);
        users_in_project.push(profiles[index]);
      });
      this.setState({ users: [...users_in_project] });
    }
  };

  render() {
    const { choice } = this.props
    
    switch (choice) {
      case 'create':
        return (
          <CreateProjectForm
            nextStep={this.nextStep}
            returnToOverview={this.returnToOverview}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleToogle={this.handleToogle}
            changeUsersData={this.changeUsersData}
            values={this.state}
            create={true}
          />
        );
      case 'edit':
        return (
          <EditProjectForm
            returnStep={this.returnStep}
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
    }
  }
}