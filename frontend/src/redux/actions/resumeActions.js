import axios from 'axios';
import {
  FETCH_RESUME_SUCCESS,
  CREATE_RESUME_SUCCESS,
  UPDATE_RESUME_SUCCESS,
  DELETE_RESUME_SUCCESS
} from '../types';

// Fetch Resume by User ID
export const fetchResumeByUserId = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/resume/${userId}`);
    dispatch({
      type: FETCH_RESUME_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Create Resume
export const createResume = (resumeData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      }
    };

    const res = await axios.post('http://localhost:5000/api/resume', resumeData, config);
    dispatch({
      type: CREATE_RESUME_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Update Resume
export const updateResume = (id, updatedData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      }
    };

    const res = await axios.put(`http://localhost:5000/api/resume/${id}`, updatedData, config);
    dispatch({
      type: UPDATE_RESUME_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Delete Resume
export const deleteResume = (id) => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();

    await axios.delete(`http://localhost:5000/api/resume/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: DELETE_RESUME_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};
