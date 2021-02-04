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

export const getUsers = () => {
    return dispatch => {
    
     dispatch(profileListStart());
      axios.get('/api/get_users_list/')
      .then(res => {
        console.log(res.data)
        res.data.sort((a,b) => (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0))     
        dispatch(profileListFinish(res.data))
    })
    .catch(error => dispatch(profileListFail(error)) )
    }   
}