import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import NavBar from './NavBar';
import Home from './Home';
import AboutUs from './AboutUs';
import TopDishes from './TopDishes';
import ContactUs from './ContactUs';
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import ProtectedRoute from './ProtectedRoute';
import Page from './Page';
import AdminPage from './AdminPage';

function Main() {
  const location = useLocation();
  const { authState } = useContext(AuthContext); // Access authentication state from AuthContext

  const hideNavBarRoutes = ['/login', '/signup', '/page','/admin'];

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
        <Route path="/page" element={<Page />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />


        {/* Logout Route */}
        {authState.isAuthenticated && (
          <Route path="/logout" element={<div>Logout Content</div>} />
        )}
      </Routes>
    </div>
  );
}

export default Main;