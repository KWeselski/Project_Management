import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";

class EditProjectForm extends Component {

  async componentDidMount() {
    await this.props.getData()
  }

  render() {
    if(this.props.values.creator != this.props.user){
      return <div>You aren't creator</div>
    }
    switch (this.props.values.step) {
      case 1:
        return (
          <FormCreate
            nextStep={this.props.nextStep}
            returnToOverview={this.props.returnToOverview}
            handleChange={this.props.handleChange}
            handleStartDateChange={this.props.handleStartDateChange}
            handleEndDateChange={this.props.handleEndDateChange}
            handleToogle={this.props.handleToogle}
            changeUsersData={this.props.changeUsersData}
            values={this.props.values}
            update={true}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={this.props.returnStep}
            returnToOverview={this.props.returnToOverview}
            changeUsersData={this.props.changeUsersData}
            values={this.props.values}
            update={true}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
      get_project: (project_id) => { dispatch(project_action.getProjectValues(project_id))}
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectForm);
