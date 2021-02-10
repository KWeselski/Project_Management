
  export const nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  export const returnStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  export const returnToOverview = () => {
    this.setState({ returnToOverview: true });
  };

  export const handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  export const checkDate = () => {
    const { startDate, endDate, } = this.state;
    if (startDate > endDate) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  export const handleStartDateChange = (date) => {
    this.setState({ startDate: date }, () => {
      this.checkDate();
    });
  };

  export const handleEndDateChange = (date) => {
    this.setState({ endDate: date }, () => {
      this.checkDate();
    });
  };

  export const changeUsersData = () => {
    if (!this.state.users.some((i) => !Number.isInteger(i))) {
      const { profiles } = this.props;
      const users_in_project = [];
      this.state.users.map((user) => {
        let index = profiles.findIndex((x) => x.user == user);
        users_in_project.push(profiles[index]);
      });
      this.setState({ users: [...users_in_project] });
    }
  };

  export const handleToogle = (value) => () => {
    const { users } = this.state;
    const currentIndex = users
      .map((v) => {
        return v.id;
      })
      .indexOf(value.id);
    const newChecked = [...users];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ users: newChecked });
  };

   export const getCurrentDate = (date) => {
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} Time: ${hour}:${minutes}`;
  };