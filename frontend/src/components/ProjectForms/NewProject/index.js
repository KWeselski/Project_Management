import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import * as project_action from "../../actions/actualProjectActions";
import { connect } from "react-redux";

class CreateProjectForm extends Component {
  state = {
    step: 1,
    ToOverview: false,
    loaded : false,
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

   checkDate = () => {
    const { startDate, endDate, } = this.state;
    if (startDate > endDate) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  componentDidMount(){
    this.props.cleanState();
    this.setState({loaded:true})
  }

  render() {
    const { step ,loaded} = this.state;

    if(!loaded){
      return(<h1>Loading</h1>)
    }

    switch (step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.nextStep}
            returnToOverview={this.returnToOverview}
            handleChange={this.handleChange}
            changeUsersData={this.changeUsersData}
            values={this.state}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.returnStep}
            returnToOverview={this.returnToOverview}
            values={this.state}
            create={true}
          />
        );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      cleanState: () => {
        dispatch(project_action.createProjectStart())
      }
  };
};

export default connect(null, mapDispatchToProps)(CreateProjectForm);
