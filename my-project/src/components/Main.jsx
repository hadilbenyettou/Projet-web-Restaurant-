import NavBar from './NavBar';
import Header from './Header';
import AboutUs from './AboutUs';
import TopDishes from './TopDishes';

function Main() {
  return (
    <div>
      <NavBar />
      <section id="home">
        <Header />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="about">
        <TopDishes />
      </section>
    </div>
  );
}

export default Main;
