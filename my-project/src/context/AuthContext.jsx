import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if there's a token in localStorage
    if (token) {
      fetchUserData(token); // If there's a token, fetch user data
    } else {
      setAuthState({ isAuthenticated: false, user: null });
    } 
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
      if (data.success) {
        setAuthState({ isAuthenticated: true, user: data.user, role: data.role });
      } else {
        setAuthState({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setAuthState({ isAuthenticated: false, user: null });
    }
  };

  const login = (userData, token,role) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setAuthState({
      isAuthenticated: true,
      user: userData,
      role: role,
    });
    console.log('AuthState after login:', { isAuthenticated: true, user: userData, role });
    navigate(role === 'admin' ? '/admin' : '/page');  
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuthState({ isAuthenticated: false, user: null });
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes to validate the children prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Define children as a required prop
};

export default AuthContext;
