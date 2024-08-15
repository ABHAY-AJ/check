import axios from 'axios';
import { 
  FETCH_INTERNSHIPS_SUCCESS, 
  CREATE_INTERNSHIP_SUCCESS, 
  UPDATE_INTERNSHIP_SUCCESS, 
  DELETE_INTERNSHIP_SUCCESS 
} from '../types';

export const fetchInternships = () => async (dispatch) => {
  try {
    const res = await axios.get('https://check-49cs.onrender.com/api/internships');
    dispatch({
      type: FETCH_INTERNSHIPS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
export const createInternship = (internshipData) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth holds the authentication details including token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}` // Attach the token to the request
      }
    };

    const res = await axios.post('https://check-49cs.onrender.com/api/internships', internshipData, config);
    dispatch({
      type: CREATE_INTERNSHIP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateInternship = (id, updatedData) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth holds the authentication details including token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}` // Attach the token to the request
      }
    };

    const res = await axios.put(`https://check-49cs.onrender.com/api/internships/${id}`, updatedData, config);
    dispatch({
      type: UPDATE_INTERNSHIP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteInternship = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth holds the authentication details including token
    const config = {
      headers: {
        'Authorization': `Bearer ${auth.token}` // Attach the token to the request
      }
    };

    await axios.delete(`https://check-49cs.onrender.com/api/internships/${id}`, config);
    dispatch({
      type: DELETE_INTERNSHIP_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};

