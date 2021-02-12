import React, { Component } from "react";
import CreateProjectForm from './NewProject/index'
import EditProjectForm from './EditProject/index'
import axios from 'axios';

export default class ProjectForm extends Component {

state = {
    step: 1,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    users: [],
    creator: null,
    status: "",
    project_id: null,
    ToOverview: false,
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
    this.setState({ ToOverview: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkDate = () => {
    const { startDate, endDate} = this.state;
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

  handleToogle = (value) => () => {
    const { users } = this.state;
    const currentIndex = users.map((v) => {
        return v.id;
      })
      .indexOf(value.id);
    const new_checked = [...users];
    if (currentIndex === -1) {
      new_checked.push(value);
    } else {
      new_checked.splice(currentIndex, 1);
    }
    this.setState({ users: new_checked });
  };

  changeUsersData = (profiles) => {
    if (!this.state.users.some((i) => !Number.isInteger(i))) {
      //const { profiles } = this.props;
      const users_in_project = [];
      this.state.users.map((user) => {
        let index = profiles.findIndex((x) => x.user == user);
        users_in_project.push(profiles[index]);
      });
      this.setState({ users: [...users_in_project] });
    }
  };


  getProjectValues = async () => {
    const id = (String(window.location).split("/").pop())
    await axios.get(`/api/get_project/${id}`).then((res) => { 
      const data = res.data;
       this.setState({
        title: data.title,
       description: data.description,
       startDate: new Date(data.start_date),
       endDate: new Date(data.end_date),
       users: data.users,
       status: data.status,
       creator: data.creator,
       project_id:id})
    })
     
  
 }  

  render() {
    const choice = (this.props.match.params.id) ? 'edit' : 'create' 
    switch (choice) {
      case 'create':
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
            values={this.state}
          />
        );
      case 'edit':
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
            values={this.state}
            getData={this.getProjectValues}
          />
        );
       default:
           return(<h1>Loading</h1>)
    }
  }
}