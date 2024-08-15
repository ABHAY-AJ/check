// src/components/PrivateRoute/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div><h1>Login to continue.. <Button type="button" className="w-50 p-1 btn btn-primary" href='/'>Login</Button></h1></div>; 
  }

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
