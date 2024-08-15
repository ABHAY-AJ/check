// src/components/navbar/navbar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login after logout
  };

  // Hide the logout button on login and register pages
  const showLogout = !['/', '/register'].includes(location.pathname);

  return (
    <nav>
      {/* Other navbar items */}
      {showLogout && (
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
