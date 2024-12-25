import NavBar from './NavBar';
import Home from './Home';
import AboutUs from './AboutUs';
import TopDishes from './TopDishes';
import ContactUs from './ContactUs';

function Main() {
  return (
    <div>
      <NavBar />
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="Menu">
        <TopDishes />
      </section>
      <section id="ContactUs">
        <ContactUs/>
      </section>
    </div>
  );
}

export default Main;
