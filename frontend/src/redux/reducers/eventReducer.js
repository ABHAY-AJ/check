import { FETCH_EVENTS_SUCCESS } from '../types';

const initialState = [];

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default eventReducer;
