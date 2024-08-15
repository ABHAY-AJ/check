import axios from 'axios';
import {
  FETCH_JOBS_SUCCESS,
  CREATE_JOB_SUCCESS,
  UPDATE_JOB_SUCCESS,
  DELETE_JOB_SUCCESS
} from '../types';
import CONFIG from '../backend_API/api';

export const fetchJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/api/jobs`);
    dispatch({
      type: FETCH_JOBS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createJob = (jobData) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth holds the authentication details including token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}` // Attach the token to the request
      }
    };

    const res = await axios.post(`${CONFIG.API_URL}/api/jobs`, jobData, config);
    dispatch({
      type: CREATE_JOB_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateJob = (id, updatedData) => async (dispatch, getState) => {
  try {
    const { auth } = getState(); // Assuming auth holds the authentication details including token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}` // Attach the token to the request
      }
    };

    const res = await axios.put(`${CONFIG.API_URL}/api/jobs/${id}`, updatedData, config);
    dispatch({
      type: UPDATE_JOB_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState(); // Get token from Redux state or wherever it's stored

    await axios.delete(`${CONFIG.API_URL}/api/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: DELETE_JOB_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.error(err);
    // Optionally, dispatch an error action or show a notification
  }
};

