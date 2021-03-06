import React, { Component } from "react";

import axios from "axios";

import FormEditProfileInfo from "./FormEditProfileInfo";
import FormEditAvatarAbout from "./FormEditAvatarAbout";
import ProfileEditConfirm from "./ProfileEditConfirm";

class EditProfileForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    sex: "",
    age: "",
    phone: "",
    avatar: null,
    description: "",
    user_id: "",
    returnToProfile: false,
    selectedFile: null,
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

  returnToProfile = () => {
    this.setState({ returnToProfile: true });
  };

  handleImageUpload = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      this.setState({
        avatar: e.target.result,
        selectedFile: file,
      });
    };
  };

  createFormData = () => {
    var image;
    
    const form_data = new FormData();
    if (this.state.selectedFile) {
    form_data.append("avatar", this.state.selectedFile);
    }
    form_data.append("first_name", this.state.firstName);
    form_data.append("last_name", this.state.lastName);
    form_data.append("sex", this.state.sex);
    form_data.append("age", this.state.age);
    form_data.append("phone", this.state.phone);
    form_data.append("description", this.state.description);
    form_data.append("user", this.state.user_id);
    return form_data;
  };

  updateProfile = async () => {
    const form_data = this.createFormData();
    await axios
      .put("/api/profile/data", form_data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        return error.response.data
      });
  };

  componentDidMount() {
    const values = this.props.location.state;
    this.setState(values);
  }

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <FormEditProfileInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={this.state}
          />
        );
      case 2:
        return (
          <FormEditAvatarAbout
            returnStep={this.returnStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleImageUpload={this.handleImageUpload}
            values={this.state}
          />
        );
      case 3:
        return (
          <ProfileEditConfirm
            returnStep={this.returnStep}
            handleChange={this.handleChange}
            updateProfile={this.updateProfile}
            returnToProfile={this.returnToProfile}
            values={this.state}
          />
        );
      default:
        return <React.Fragment />;
    }
  }
}

export default EditProfileForm;
