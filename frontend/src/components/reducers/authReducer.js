import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  RESET_PASS,
  USER_LOADING,
  USER_LOADED,
  PROFILE_LIST_START,
  PROFILE_LIST_FAIL,
  PROFILE_LIST_FINISH,
} from "../actions/action-types/auth-actions";

const initialState = {
  profiles: [],
  token: null,
  error: null,
  loading: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  if (action.type == AUTH_START) {
    return { ...state, error: null, loading: true };
  }
  if (action.type == AUTH_SUCCESS) {
    return { ...state, token: action.token, error: null, loading: false };
  }
  if (action.type == AUTH_FAIL) {
    return { ...state, error: action.error, loading: false };
  }
  if (action.type == AUTH_LOGOUT) {
    return { ...state, token: null, loading: false };
  }
  if (action.type == RESET_PASS) {
    return { ...state, error: null, loading: false };
  }
  if (action.type == USER_LOADING) {
    return { ...state, loading: true };
  }
  if (action.type == USER_LOADED) {
    return { ...state, loading: false, user: action.user };
  }
  if (action.type == PROFILE_LIST_START) {
    return { ...state, loading: true, error: null };
  }
  if (action.type == PROFILE_LIST_FAIL) {
    return { ...state, loading: false, error: action.error, profiles: [] };
  }
  if (action.type == PROFILE_LIST_FINISH) {
    return Object.assign({}, state, {
      profiles: action.payload.profiles,
      loading: false,
    });
  } else {
    return state;
  }
};

export default authReducer;
