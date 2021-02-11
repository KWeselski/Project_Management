import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import * as project_action from "../../actions/actualProjectActions";
import { connect } from "react-redux";

class CreateProjectForm extends Component {
  state = {
    ToOverview: false,
    loaded : false,
  };

  componentDidMount(){
    //this.props.cleanState();
    this.setState({loaded:true})
  }

  render() {
    const {loaded} = this.state;

    if(!loaded){
      return(<h1>Loading</h1>)
    }

    switch (step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.props.nextStep}
            returnToOverview={this.returnToOverview}
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
