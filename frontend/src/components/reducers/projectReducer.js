import {
  GET_PROJECT_START,
  GET_PROJECT_FAIL,
  GET_PROJECT_FINISH,
} from "../actions/action-types/project-actions";
import {
  PROJECT_DELETE_START,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_FINISH,
} from "../actions/action-types/project-actions";
import {
  PROJECT_ADD_START,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_FINISH,
} from "../actions/action-types/project-actions";

const initialState = {
  projects: [],
  error: null,
  loading: false,
};

const projectReducer = (state = initialState, action) => {
  if (action.type == GET_PROJECT_START) {
    return { ...state, loading: true, error: null };
  }
  if (action.type == GET_PROJECT_FAIL) {
    return { ...state, loading: false, error: action.error, projects: [] };
  }
  if (action.type == GET_PROJECT_FINISH) {
    return Object.assign({}, state, {
      projects: action.payload.projects,
      loading: false,
    });
  }
  if (action.type == PROJECT_DELETE_START) {
    return { ...state, loading: true, error: null };
  }
  if (action.type == PROJECT_DELETE_FAIL) {
    return { ...state, loading: false, error: action.error };
  }

  if (action.type == PROJECT_ADD_START) {
    return { ...state, loading: true, error: null };
  }
  if (action.type == PROJECT_ADD_FAIL) {
    return { ...state, loading: false, error: action.error };
  }

  if (action.type == PROJECT_ADD_FINISH) {
    return { ...state, loading: false, error: null };
  }

  if (action.type == PROJECT_DELETE_FINISH) {
    let new_projects = state.projects.filter(
      (project) => action.payload.project.id !== project.id
    );
    return {
      ...state,
      projects: new_projects,
      loading: false,
    };
  } else {
    return state;
  }
};

export default projectReducer;
