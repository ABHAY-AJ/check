import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Events from './components/Events/Events';
import Jobs from './components/Jobs/Jobs';
import Internships from './components/Internships/Internships';
import Courses from './components/Courses/Courses';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import Navbar from './components/navbar/navbar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/authActions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (

    <Router>
    <div className="App container">
      <Navbar/>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/events" element={<PrivateRoute element={<Events />} />} />
          <Route path="/jobs" element={<PrivateRoute element={<Jobs />} />} />
          <Route path="/internships" element={<PrivateRoute element={<Internships />} />} />
          <Route path="/courses" element={<PrivateRoute element={<Courses />} />} />
          <Route path="/resume-builder" element={<PrivateRoute element={<ResumeBuilder />} />} />
        </Routes>
     
    </div>
    </Router>
  );
}

export default App;
