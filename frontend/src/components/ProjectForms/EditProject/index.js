import React, { Component } from "react";
import FormConfirm from "../FormConfirm";
import FormCreate from "../FormCreate";
import { connect } from "react-redux";

class EditProjectForm extends Component {
  async componentDidMount() {
    await this.props.getData();
  }

  render() {
    const {
      returnStep,
      nextStep,
      returnToOverview,
      handleChange,
      handleStartDateChange,
      handleEndDateChange,
      handleToogle,
      changeUsersData,
      values,
      user,
    } = this.props;
    if (values.creator != user) {
      return <div style={{position: 'fixed', top: '50%',left:'50%'}}>You aren't creator</div>;
    }
    switch (values.step) {
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
            values={values}
            update={true}
          />
        );
      case 2:
        return (
          <FormConfirm
            returnStep={returnStep}
            returnToOverview={returnToOverview}
            changeUsersData={changeUsersData}
            values={values}
            update={true}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(EditProjectForm);
