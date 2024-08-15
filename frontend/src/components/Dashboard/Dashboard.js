import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="text-center mt-5">Dashboard</h2>
      <p className="text-center">Welcome, {auth.user ? auth.user.name : ''}</p>
      <div className="text-center">
        <Link to="/events" className="btn btn-primary m-2">
          View Events
        </Link>
        <Link to="/jobs" className="btn btn-primary m-2">
          View Jobs
        </Link>
        <Link to="/internships" className="btn btn-primary m-2">
          View Internships
        </Link>
        <Link to="/courses" className="btn btn-primary m-2">
          View Courses
        </Link>
        <Link to="/resume-builder" className="btn btn-primary m-2">
          Resume Builder
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
