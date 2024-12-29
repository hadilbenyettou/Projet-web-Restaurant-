// src/components/ProtectedRoute.jsx

import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext.jsx'; // Import your authentication context

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext); // Get the authState from the context

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Return the protected content if authenticated
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is passed and is a React node
};

export default ProtectedRoute;
