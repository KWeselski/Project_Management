import React, { Component } from "react";

import axios from "axios";

import CreateProjectForm from "./NewProject/index";
import EditProjectForm from "./EditProject/index";

const initialState = {
  step: 1,
  title: "",
  description: "",
  startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
  endDate: new Date(new Date().setHours(new Date().getHours() + 2)),
  users: [],
  creator: null,
  status: "",
  projectId: null,
  toOverview: false,
  validate: false,
};

export default class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  clearStateForNewProject = () => {
    this.setState(initialState);
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
    this.setState({
      toOverview: true,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkDate = () => {
    const { startDate, endDate, validate } = this.state;
    const today = new Date();
    if (startDate == "Invalid Date" || endDate == "Invalid Date") {
      this.setState({ validate: false });
      return;
    }
    if (startDate < today) {
      this.setState({ validate: false });
      return;
    }
    if (startDate != null && endDate != null) {
      if (startDate.getTime() >= endDate.getTime()) {
        this.setState({ validate: false });
        return;
      }
    }
    if (!validate) {
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

  changeUsersData = (profiles) => {
    if (!this.state.users.some((i) => !Number.isInteger(i))) {
      const usersInProject = [];
      this.state.users.map((user) => {
        let index = profiles.findIndex((x) => x.user == user);
        usersInProject.push(profiles[index]);
      });
      this.setState({ users: [...usersInProject] });
    }
  };

  getProjectValues = async () => {
    const id = String(window.location).split("/").pop();
    await axios.get(`/api/project/get/${id}`).then((res) => {
      const data = res.data;
      this.setState({
        title: data.title,
        description: data.description,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        users: data.users,
        status: data.status,
        creator: data.creator,
        projectId: id,
      });
    });
  };

  render() {
    const choice = this.props.match.params.id ? "edit" : "create";
    switch (choice) {
      case "create":
        return (
          <CreateProjectForm
            nextStep={this.nextStep}
            returnStep={this.returnStep}
            returnToOverview={this.returnToOverview}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleToogle={this.handleToogle}
            changeUsersData={this.changeUsersData}
            newState={this.clearStateForNewProject}
            checkDate={this.checkDate}
            values={this.state}
          />
        );
      case "edit":
        return (
          <EditProjectForm
            nextStep={this.nextStep}
            returnStep={this.returnStep}
            returnToOverview={this.returnToOverview}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            handleToogle={this.handleToogle}
            changeUsersData={this.changeUsersData}
            getData={this.getProjectValues}
            values={this.state}
          />
        );
      default:
        return <h1>Loading</h1>;
    }
  }
}
