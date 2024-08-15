import { FETCH_COURSES_SUCCESS } from '../types';

const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default courseReducer;
