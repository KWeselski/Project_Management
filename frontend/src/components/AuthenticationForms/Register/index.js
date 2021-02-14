import React, { Component } from "react";
import PasswordPage from "./PasswordPage";
import PersonalInfoPage from "./PersonalInfoPage";

export default class RegistrationForm extends Component {
  state = {
    step: 1,
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    sex: "",
    age: "",
    phone: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  returnStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      step,
      firstName,
      lastName,
      sex,
      age,
      phone,
    } = this.state;
    switch (step) {
      case 1:
        return (
          <PersonalInfoPage
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            sex={sex}
            age={age}
            phone={phone}
          />
        );
      case 2:
        return (
          <PasswordPage
            returnStep={this.returnStep}
            handleChange={this.handleChange}
            values={this.state}
          />
        );
      default:
        return <React.Fragment />;
    }
  }
}
