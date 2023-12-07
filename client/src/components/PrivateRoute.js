import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = token && token.length > 0;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
