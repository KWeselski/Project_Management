import * as actionTypes from "../actions/action-types/actualProject-actions";

const initialState = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  users: [],
  status: "",
  validate: false,
};

const actualProjectReducer = (state = initialState, action) => {
  if (action.type == actionTypes.CREATE_PROJECT_START) {
    return {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      users: [],
      status: "",
      validate: false,
    };
  }

  if (action.type == actionTypes.EDIT_PROJECT_START) {
    
    return {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      users: [],
      status: "",
      validate: false,
    };
  }

  if (action.type == actionTypes.CHECK_DATES) {
    if (state.startDate > state.endDate) {
      return { ...state, validate: false };
    } else {
      return { ...state, validate: true };
    }
  }
  if (action.type == actionTypes.CHANGE_START_DATE) {
    return { ...state, startDate: action.date };
  }
  if (action.type == actionTypes.CHANGE_END_DATE) {
    return { ...state, endDate: action.date };
  }
  if (action.type == actionTypes.CHANGE_USER_DATA) {
    if (!state.users.some((i) => !Number.isInteger(i))) {
      const users_in_project = [];
      state.users.map((user) => {
        var index = action.profiles.findIndex((x) => x.user == user);
        users_in_project.push(profiles[index]);
      });
      return { ...state, users: [...users_in_project] };
    }
  }

  if (action.type == actionTypes.TOOGLE_USER) {
    const currentIndex = state.users
      .map((v) => {
        return v.id;
      })
      .indexOf(action.user.id);
    const newChecked = [...state.users];
    if (currentIndex === -1) {
      newChecked.push(action.user);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    return { ...state, users: newChecked };
  }

  if (action.type == actionTypes.APPLY_TITLE_DESC) {
    return { ...state, title: action.title, description: action.description };
  } else {
    return state;
  }
};
export default actualProjectReducer;
