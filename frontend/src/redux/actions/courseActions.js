import axios from 'axios';
import { FETCH_COURSES_SUCCESS } from '../types';

// Fetch all courses
export const fetchCourses = () => async (dispatch) => {
  try {
    const res = await axios.get('https://check-49cs.onrender.com/api/courses');
    dispatch({
      type: FETCH_COURSES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Create a new course
export const createCourse = (courseData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };
    await axios.post('https://check-49cs.onrender.com/api/courses', courseData, config);
    dispatch(fetchCourses()); // Optionally, refetch courses after creation
  } catch (err) {
    console.error(err);
  }
};

// Update a course
export const updateCourse = (courseId, courseData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };
    await axios.put(`https://check-49cs.onrender.com/api/courses/${courseId}`, courseData, config);
    dispatch(fetchCourses()); // Optionally, refetch courses after update
  } catch (err) {
    console.error(err);
  }
};

// Delete a course
export const deleteCourse = (courseId) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    await axios.delete(`https://check-49cs.onrender.com/api/courses/${courseId}`, config);
    dispatch(fetchCourses()); // Optionally, refetch courses after deletion
  } catch (err) {
    console.error(err);
  }
};
