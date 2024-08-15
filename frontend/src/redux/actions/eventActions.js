import axios from 'axios';
import { FETCH_EVENTS_SUCCESS } from '../types';
import { getToken } from '../../utils/tokenUtils'; // Ensure you have a utility to get the token
import CONFIG from '../backend_API/api';

// Function to show an alert
const showAlert = (message) => {
  alert(message);
};

// Fetch all events
export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/api/events`);
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 401) {
      showAlert('Unauthorized access. Please log in.');
    }
  }
};

// Create new event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.post(`${CONFIG.API_URL}/api/events`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 401) {
      showAlert('Unauthorized. You do not have permission to create events.');
    }
  }
};

// Update existing event
export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.put(`${CONFIG.API_URL}/api/events/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error('Request failed with status code', err.response.status);
    if (err.response && err.response.status === 401) {
      showAlert('Unauthorized. You do not have permission to update this event.');
    }
  }
};

// Delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.delete(`${CONFIG.API_URL}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 401) {
      showAlert('Unauthorized. You do not have permission to delete this event.');
    }
  }
};
