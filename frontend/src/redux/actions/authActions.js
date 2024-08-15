import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS,LOGOUT } from '../types';

// Function to get the current user
// src/actions/authActions.js

export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://your-backend-url.onrender.com/api/auth', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    console.error(err.response.data);
    dispatch({ type: 'AUTH_ERROR' });
  }
};

export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('https://check-49cs.onrender.com/api/auth/login', userData);
    localStorage.setItem('token', res.data.token); // Store token in localStorage
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response.data);
  }
};

export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('https://check-49cs.onrender.com/api/auth/register', userData);
    localStorage.setItem('token', res.data.token); // Store token in localStorage
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response.data);
  }
};



export const logout = () => {
  return (dispatch) => {
    // Clear user data from local storage or session
    localStorage.removeItem('user');
    // Dispatch logout action
    dispatch({ type: LOGOUT });
  };
};
