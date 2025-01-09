// components/Footer.jsx
const Footer = () => {
    return (
      <footer className="bg-brown-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 fork and spoon. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-gold-500">Contact Us</a>
            <a href="#" className="hover:text-gold-500">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
};

export default Footer;