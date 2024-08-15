import { 
  FETCH_INTERNSHIPS_SUCCESS, 
  CREATE_INTERNSHIP_SUCCESS, 
  UPDATE_INTERNSHIP_SUCCESS, 
  DELETE_INTERNSHIP_SUCCESS 
} from '../types';

const initialState = [];

const internshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERNSHIPS_SUCCESS:
      return action.payload;
    case CREATE_INTERNSHIP_SUCCESS:
      return [...state, action.payload];
    case UPDATE_INTERNSHIP_SUCCESS:
      return state.map(internship =>
        internship._id === action.payload._id ? action.payload : internship
      );
    case DELETE_INTERNSHIP_SUCCESS:
      return state.filter(internship => internship._id !== action.payload);
    default:
      return state;
  }
};

export default internshipReducer;
