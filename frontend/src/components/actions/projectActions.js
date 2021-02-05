import * as actionTypes from './action-types/project-actions'
import axios from 'axios'


export const profileListStart = () => {
    return {
        type: actionTypes.PROFILE_LIST_START
    };
};
  
export const profileListFail = error => {
    return {
        type: actionTypes.PROFILE_LIST_FAIL,
        error:error
    };
};
  
export const profileListFinish = profiles => {
    return {
        type: actionTypes.PROFILE_LIST_FINISH,
        payload: {profiles} 
    };
};

export const getProjectsStart = () => {
  return {
    type: actionTypes.GET_PROJECT_START,
  };
};

export const getProjectsFail = error => {
  return {
    type: actionTypes.GET_PROJECT_FAIL,
    error:error
  }
}

export const getProjectsFinish = projects => {
  return {
    type: actionTypes.GET_PROJECT_FINISH,
    payload: {projects}
  }
}

export const projectDeleteStart = () => {
  return {
    type: actionTypes.PROJECT_DELETE_START,
  };
};

export const projectDeleteFail = error => {
  return {
    type: actionTypes.PROJECT_DELETE_FAIL,
    error:error
  }
}

export const projectDeleteFinish = project => {
  return {
    type: actionTypes.PROJECT_DELETE_FINISH,
    payload: {project}
  }
}

export const projectAddStart = () => {
  return {
    type: actionTypes.PROJECT_ADD_START,
  };
};

export const projectAddFail = error => {
  return {
    type: actionTypes.PROJECT_ADD_FAIL,
    error:error
  }
}

export const projectAddFinish = () => {
  return {
    type: actionTypes.PROJECT_ADD_FINISH,
    
  }
}

export const getUsers = () => {
    return dispatch => {   
     dispatch(profileListStart());
      axios.get('/api/get_users_list/')
      .then(res => {
        res.data.sort((a,b) => (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0))     
        dispatch(profileListFinish(res.data))
    })
    .catch(error => dispatch(profileListFail(error)))
    }   
}

export const getProjects = () => {
  return dispatch => {   
    dispatch(getProjectsStart());
    axios.get('/api/get_projects_list/',
    { headers: {Authorization: `${localStorage.getItem("token")}`}}
    ).then(res => {
      dispatch(getProjectsFinish(res.data));
  })
  .catch(error => dispatch(getProjectsFail(error)))
  }  
}

export const deleteProject= (project) => {
  return dispatch => {
    dispatch(projectDeleteStart());
    axios.delete('/api/delete_project',{
      data: {id: project.id}
    },
    {headers: {Authorization: `${localStorage.getItem("token")}`}})
    .then(()=>{
      dispatch(projectDeleteFinish(project));
    })
    .catch(error => dispatch(projectDeleteFail(error)))
  }
}

export const createProject = (values,users) => {
  return async dispatch => {
    dispatch(projectAddStart());
    await axios.post('/api/create_project/',{
        title:values.title,
        description:values.description,
        start_date: values.startDate,
        end_date: values.endDate,
        users: users
    },{
        headers: {Authorization: `${localStorage.getItem("token")}`}})
    .then(()=>{
      dispatch(projectAddFinish())
    })
    .catch(error => dispatch(projectAddFail(error)))
  }
}

export const updateProject = (values,users) => {
  return async dispatch => {
    dispatch(projectAddStart());
    await axios.put('api/create_project/',{
      title:values.title,
      description:values.description,
      start_date: values.startDate,
      end_date: values.endDate,
      users: users,
      status: values.status,
      id: values.project_id,
      creator: values.creator,
    },{
      headers: {Authorization: `${localStorage.getItem("token")}`}
    })
    .then(()=>{
      dispatch(projectAddFinish())
    })
    .catch(error => dispatch(projectAddFail(error)))
  }
}


