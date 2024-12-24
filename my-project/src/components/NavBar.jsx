import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-white p-2">
      {/* Logo Section */}
      <div className="bg-[url('/images/sf.png')] bg-no-repeat bg-center bg-contain w-72 h-12"></div>

      {/* Main Menu */}
      <ul className="hidden md:flex space-x-8 justify-center">
        <li><a href="#home" className="text-customBrown hover:text-customGreen">Home</a></li>
        <li><a href="#about" className="text-customBrown hover:text-customGreen">About</a></li>
        <li><a href="#menu" className="text-customBrown hover:text-customGreen">Menu</a></li>
        <li><a href="#awards" className="text-customBrown hover:text-customGreen">Awards</a></li>
        <li><a href="#contact" className="text-customBrown hover:text-customGreen">Contact</a></li>
      </ul>

      {/* Right Side Links */}
      <div className="flex items-center justify-center space-x-6 mt-4 md:mt-0">
        <a href="#login" className="text-customBrown hover:text-customGreen">Log In / Registration</a>
        <span className="border-l-2 border-gray-400 h-6"></span>
        <a href="/" className="text-customBrown hover:text-customGreen">Book Table</a>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="text-white absolute top-5 right-5 cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links flex flex-col items-center space-y-4 text-white text-lg">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
