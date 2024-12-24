import NavBar from './NavBar';
import Header from './Header';
import AboutUs from './AboutUs';


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
    </div>
  );
}

export default Main;
