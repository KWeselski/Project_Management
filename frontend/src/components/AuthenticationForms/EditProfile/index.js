import React, { Component } from "react";
import FormEditProfileInfo from "./FormEditProfileInfo";
import FormEditAvatarAbout from "./FormEditAvatarAbout";
import ProfileEditConfirm from "./ProfileEditConfirm";
import axios from "axios";

class EditProfileForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    sex: "",
    age: "",
    phone: "",
    avatar: "",
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
    if (this.state.selectedFile) {
      image = this.state.selectedFile;
    } else {
      image = this.state.avatar;
    }
    const form_data = new FormData();
    form_data.append("firstname", this.state.firstName);
    form_data.append("lastname", this.state.lastName);
    form_data.append("sex", this.state.sex);
    form_data.append("age", this.state.age);
    form_data.append("phone", this.state.phone);
    form_data.append("description", this.state.description);
    form_data.append("avatar", image);
    form_data.append("user", this.state.user_id);
    return form_data;
  };

  updateProfile = async () => {
    const form_data = this.createFormData();
    await axios
      .put("/api/profile_data", form_data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const values = this.props.location.state;
    this.setState(values);
  }

  render() {
    const { step } = this.state;
    const {
      returnStep,
      nextStep,
      handleChange,
      handleImageUpload,
      updateProfile,
      returnToProfile,
    } = this.props;
    switch (step) {
      case 1:
        return (
          <FormEditProfileInfo
            nextStep={nextStep}
            handleChange={handleChange}
            values={this.state}
          />
        );
      case 2:
        return (
          <FormEditAvatarAbout
            returnStep={returnStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
            values={this.state}
          />
        );
      case 3:
        return (
          <ProfileEditConfirm
            returnStep={returnStep}
            handleChange={handleChange}
            updateProfile={updateProfile}
            returnToProfile={returnToProfile}
            values={this.state}
          />
        );
      default:
        return <React.Fragment />;
    }
  }
}

export default EditProfileForm;
