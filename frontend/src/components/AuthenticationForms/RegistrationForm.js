import React, { Component } from "react";
import FormPassword from "./FormPassword";
import FormPersonalInfo from "./FormPersonalInfo";

class RegistrationForm extends Component {
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
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <FormPersonalInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={this.state}
          />
        );
      case 2:
        return (
          <FormPassword
            returnStep={this.returnStep}
            handleChange={this.handleChange}
            values={this.state}
          />
        );
      default:
        console.log();
    }
  }
}

export default RegistrationForm;
