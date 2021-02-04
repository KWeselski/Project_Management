import {PROFILE_LIST_START, PROFILE_LIST_FAIL, PROFILE_LIST_FINISH} from '../actions/action-types/project-actions'

const initialState = {
    profiles: [],
    error: null,
    loading: false,
}

const projectReducer = (state=initialState, action) => {

    if(action.type == PROFILE_LIST_START){
        return{...state,
        loading:true,
        error:null}
    }
    if(action.type == PROFILE_LIST_FAIL){
        return{...state,
        loading:false,
        error:action.error,
        profiles:[]}
    }
    if(action.type == PROFILE_LIST_FINISH){
        return Object.assign({}, state, {
            profiles: state.profiles.concat(action.payload.profiles),
            loading:false
        });
    }
    else{
        return state
    }
}

export default projectReducer