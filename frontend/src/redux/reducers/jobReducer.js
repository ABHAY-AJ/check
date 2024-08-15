import {
  FETCH_JOBS_SUCCESS,
  CREATE_JOB_SUCCESS,
  UPDATE_JOB_SUCCESS,
  DELETE_JOB_SUCCESS
} from '../types';


const initialState = [];

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return action.payload;
    case CREATE_JOB_SUCCESS:
      return [...state, action.payload];
    case UPDATE_JOB_SUCCESS:
      return state.map(job =>
        job._id === action.payload._id ? action.payload : job
      );
    case DELETE_JOB_SUCCESS:
      return state.filter(job => job._id !== action.payload);
    default:
      return state;
  }
};

export default jobReducer;
