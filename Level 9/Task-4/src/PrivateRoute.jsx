import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
