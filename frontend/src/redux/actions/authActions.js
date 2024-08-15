import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from '../types';
import CONFIG from '../backend_API/api';

// Function to show an alert
const showAlert = (message) => {
  alert(message);
};

// Function to get the current user
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const res = await axios.get(`${CONFIG.API_URL}/api/auth`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (err.response && err.response.status === 401) {
      showAlert('Unauthorized access. Please log in again with valid credentials.');
    }
    dispatch({ type: 'AUTH_ERROR' });
  }
};

export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${CONFIG.API_URL}/api/auth/login`, userData);
    localStorage.setItem('token', res.data.token); // Store token in localStorage
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (err.response && err.response.status === 401) {
      showAlert('Invalid credentials. Please check your login details.');
    } else {
      showAlert('An error occurred. Please try again with valid credentials.');
    }
  }
};

export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${CONFIG.API_URL}/api/auth/register`, userData);
    localStorage.setItem('token', res.data.token); // Store token in localStorage
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (err.response && err.response.status === 400) {
      showAlert('Registration failed. Please check your details and try again.');
    } else {
      showAlert('An error occurred. Please try again with valid credentials.');
    }
  }
};

export const logout = () => {
  return (dispatch) => {
    // Clear user data from local storage or session
    localStorage.removeItem('token');
    // Dispatch logout action
    dispatch({ type: LOGOUT });
  };
};
