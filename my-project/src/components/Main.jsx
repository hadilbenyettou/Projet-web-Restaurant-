import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import NavBar from './NavBar';
import Home from './Home';
import AboutUs from './AboutUs';
import TopDishes from './TopDishes';
import ContactUs from './ContactUs';
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import ProtectedRoute from './ProtectedRoute';
import Page from './Page'
function Main() {
  const location = useLocation();
  const { authState } = useContext(AuthContext); // Access authentication state from AuthContext

  const hideNavBarRoutes = ['/login', '/signUp','/page'];

  return (
    <div>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <AboutUs />
              </section>
              <section id="dishes">
                <TopDishes />
              </section>
              <section id="contact">
                <ContactUs />
              </section>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protecting the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {/* Only show this if the user is authenticated */}
              <div>
                Dashboard Content
              </div>
            </ProtectedRoute>
          }
        />

        {/* Show login or logout link based on authentication */}
        {authState.isAuthenticated ? (
          <Route path="/logout" element={<div>Logout Content</div>} />
        ) : (
          <Route
            path="/login"
            element={
              <Link to="/login">Please Log In</Link>
            }
          />
        )}
        <Route path="/page" element={<Page />} /> {/* Your Page route */}
      </Routes>
    </div>
  );
}

export default Main;
