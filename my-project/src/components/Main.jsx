import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import AboutUs from './AboutUs';
import TopDishes from './TopDishes';
import ContactUs from './ContactUs';
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom';

function Main() {
  const location = useLocation();

  // Define routes where the NavBar should not appear
  const hideNavBarRoutes = ['/login', '/signUp'];

  return (
    <div>
      {/* Conditionally render NavBar */}
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
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default Main;
