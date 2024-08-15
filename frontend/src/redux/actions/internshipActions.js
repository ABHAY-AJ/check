import axios from 'axios';
import { 
  FETCH_INTERNSHIPS_SUCCESS, 
  CREATE_INTERNSHIP_SUCCESS, 
  UPDATE_INTERNSHIP_SUCCESS, 
  DELETE_INTERNSHIP_SUCCESS 
} from '../types';
import CONFIG from '../backend_API/api';

export const fetchInternships = () => async (dispatch) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/api/internships`);
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

    const res = await axios.post(`${CONFIG.API_URL}/api/internships`, internshipData, config);
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

    const res = await axios.put(`${CONFIG.API_URL}/api/internships/${id}`, updatedData, config);
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

    await axios.delete(`${CONFIG.API_URL}/api/internships/${id}`, config);
    dispatch({
      type: DELETE_INTERNSHIP_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};

