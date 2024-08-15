import axios from 'axios';
import { FETCH_EVENTS_SUCCESS } from '../types';
import { getToken } from '../../utils/tokenUtils'; // Ensure you have a utility to get the token

// Fetch all events
export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('https://check-49cs.onrender.com/api/events');
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Create new event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.post('https://check-49cs.onrender.com/api/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error(err.message);
  }
};

// Update existing event
export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.put(`https://check-49cs.onrender.com/api/events/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error('Request failed with status code', err.response.status);
  }
};

// Delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    const token = getToken(); // Get the token
    await axios.delete(`https://check-49cs.onrender.com/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    dispatch(fetchEvents());
  } catch (err) {
    console.error(err.message);
  }
};
