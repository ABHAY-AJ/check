import {
    FETCH_RESUME_SUCCESS,
    CREATE_RESUME_SUCCESS,
    UPDATE_RESUME_SUCCESS,
    DELETE_RESUME_SUCCESS
  } from '../types';
  
  const initialState = {};
  
  const resumeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESUME_SUCCESS:
        return action.payload;
      case CREATE_RESUME_SUCCESS:
        return { ...state, ...action.payload };
      case UPDATE_RESUME_SUCCESS:
        return { ...state, ...action.payload };
      case DELETE_RESUME_SUCCESS:
        return {};
      default:
        return state;
    }
  };
  
  export default resumeReducer;
  