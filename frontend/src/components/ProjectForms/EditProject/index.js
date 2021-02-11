import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";
import * as project_action from "../../actions/actualProjectActions";

class EditProjectForm extends Component {

  componentDidMount() {
    if(this.props.user != null){
      const project_id = (String(window.location).split("/").pop())
      this.props.get_project(project_id)
      this.setState({loaded:true})
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user){
      const project_id = (String(window.location).split("/").pop())
      this.props.get_project(project_id)
      this.setState({loaded:true})
    }
  }

  render() {
    const { step,loaded } = this.state;
    if(!loaded){
      return(<h1></h1>)
    }

    switch (step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.nextStep}
            returnToOverview={this.returnToOverview}
            values={this.state}
            update={true}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.returnStep}
            returnToOverview={this.returnToOverview}
            values={this.state}
            update={true}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({
  users_in_project: state.actProj.users,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
      get_project: (project_id) => { dispatch(project_action.getProjectValues(project_id))}
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectForm);
