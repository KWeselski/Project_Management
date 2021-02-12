import * as actionTypes from "./action-types/actualProject-actions";
import axios from "axios";

export const createProjectStart = () => {
    return {
      type: actionTypes.CREATE_PROJECT_START,
    };
  };
  
  export const createProjectFail = (error) => {
    return {
      type: actionTypes.CREATE_PROJECT_FAIL,
      error: error,
    };
  };
  
  export const createProjectFinish = () => {
    return {
      type: actionTypes.CREATE_PROJECT_FINISH,
    };
  };

  export const getProjectStart = () => {
    return{
      type: actionTypes.GET_PROJECT_START,
    }
  }

  export const editProjectStart = (project) => {
    return{
      type: actionTypes.EDIT_PROJECT_START,
      project: project
    }
  }
  

 export const applyTitleDesc = (title, description) =>{
     return {
       type: actionTypes.APPLY_TITLE_DESC,
       title: title,
       description: description,
     }
 }

 export const checkDates = () => {
     return {
         type: actionTypes.CHECK_DATES
     }
 }

 export const changeStartDate = (date) => {
     return {
         type: actionTypes.CHANGE_START_DATE,
         date:date
     }
 }
 
 export const changeEndDate = (date) => {
     return {
         type: actionTypes.CHANGE_END_DATE,
         date:date
     }
 }

 export const toogleUser = (user) => {
     return {
         type: actionTypes.TOOGLE_USER,
         user: user
     }
 }

