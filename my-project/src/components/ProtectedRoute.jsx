// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext'; // Import your authentication context

const ProtectedRoute = ({ children, requiredRole }) => {
  const { authState } = useContext(AuthContext); // Get the authState from the context
  console.log('ProtectedRoute - authState:', authState); // Debugging
  console.log('ProtectedRoute - requiredRole:', requiredRole); // Debugging
  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    console.log('Redirecting to /login');
    return <Navigate to="/login" />;
  }

  // Redirect to home page if the user doesn't have the required role
  if (requiredRole && authState.role !== requiredRole) {
    console.log('Redirecting to /'); // Debugging
    return <Navigate to="/" />;
  }

  return children; // Return the protected content if authenticated and authorized
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is passed and is a React node
  requiredRole: PropTypes.string, // Validate the requiredRole prop (optional)
};

export default ProtectedRoute;