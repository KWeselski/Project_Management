import axios from "axios";
import * as actionTypes from "./action-types/project-actions";


export const getProjectsStart = () => {
  return {
    type: actionTypes.GET_PROJECT_START,
  };
};

export const getProjectsFail = (error) => {
  return {
    type: actionTypes.GET_PROJECT_FAIL,
    error: error,
  };
};

export const getProjectsFinish = (projects) => {
  return {
    type: actionTypes.GET_PROJECT_FINISH,
    payload: { projects },
  };
};

export const projectDeleteStart = () => {
  return {
    type: actionTypes.PROJECT_DELETE_START,
  };
};

export const projectDeleteFail = (error) => {
  return {
    type: actionTypes.PROJECT_DELETE_FAIL,
    error: error,
  };
};

export const projectDeleteFinish = (project) => {
  return {
    type: actionTypes.PROJECT_DELETE_FINISH,
    payload: { project },
  };
};

export const projectAddStart = () => {
  return {
    type: actionTypes.PROJECT_ADD_START,
  };
};

export const projectAddFail = (error) => {
  return {
    type: actionTypes.PROJECT_ADD_FAIL,
    error: error,
  };
};

export const projectAddFinish = () => {
  return {
    type: actionTypes.PROJECT_ADD_FINISH,
  };
};


export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsStart());
    axios
      .get("/api/projects/get", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch(getProjectsFinish(res.data));
      })
      .catch((error) => dispatch(getProjectsFail(error)));
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(projectDeleteStart());
    await axios
      .delete("/api/project/delete",{
         headers: { Authorization: `${localStorage.getItem("token")}` },
         data: { id: id}
        })
      .then(() => {
        dispatch(projectDeleteFinish(id));
      })
      .catch((error) => dispatch(projectDeleteFail(error)));
  };
};

export const createProject = (values, users) => {
  return async (dispatch) => {
    dispatch(projectAddStart());
    await axios
      .post(
        "/api/project/create/",
        {
          title: values.title,
          description: values.description,
          start_date: values.startDate,
          end_date: values.endDate,
          users: users,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        dispatch(projectAddFinish());
      })
      .catch((error) => dispatch(projectAddFail(error)));
  };
};

export const updateProject = (values, users, id) => {
  return async (dispatch) => {
    dispatch(projectAddStart());
    await axios
      .put(
        "/api/project/create/",
        {
          id: id,
          title: values.title,
          description: values.description,
          start_date: values.startDate,
          end_date: values.endDate,
          users: users,
          status: values.status,
          creator: values.creator,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        dispatch(projectAddFinish());
      })
      .catch((error) => dispatch(projectAddFail(error)));
  };
};
