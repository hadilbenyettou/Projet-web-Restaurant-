import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center bg-white p-4">
      <div className="flex justify-start items-center">
        <img src="/images/sf.png" alt="Logo" className="w-36 md:w-52" />
      </div>
      {/* Main Menu */}
      <ul className="hidden md:flex flex-1 justify-center items-center space-x-6 list-none text-white">
        <li><a href="#home" className="text-customBrown hover:text-customGreen">Home</a></li>
        <li><a href="#about" className="text-customBrown hover:text-customGreen">About</a></li>
        <li><a href="#menu" className="text-customBrown hover:text-customGreen">Menu</a></li>
        <li><a href="#contact" className="text-customBrown hover:text-customGreen">Contact</a></li>
      </ul>

      {/* Right Side Links */}
      <div className="hidden md:flex justify-end items-center text-white space-x-4">
        <a href="#login" className="text-customBrown hover:text-customGreen transition ease-in-out">Log In / Registration</a>
        <span className="border-l-2 border-customGreen-400 h-6"></span>
        <a href="/" className="text-customBrown hover:text-customGreen transition ease-in-out">Book Table</a>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden flex items-center">
        <GiHamburgerMenu
          fontSize={27}
          color="#000"
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="absolute top-5 right-5 text-golden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="flex flex-col items-center space-y-8 text-golden text-2xl">
            <li><Link to="/" className="text-customBrown hover:text-customGreen">Home</Link></li>
            <li><Link to="/about" className="text-customBrown hover:text-customGreen">About</Link></li>
            <li><Link to="/menu" className="text-customBrown hover:text-customGreen">Menu</Link></li>
            <li><Link to="/contact" className="text-customBrown hover:text-customGreen">Contact</Link></li>
          </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
