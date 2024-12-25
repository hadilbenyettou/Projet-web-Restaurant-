
const ContactUs = () => {
  return (
    <div
      className="p-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blackbg.avif')" }} // Replace with your actual image path
    >
      <div className="max-w-4xl mx-auto text-center p-10 border-4 border-brown-700 rounded-lg">
        <h2 className="text-white text-6xl font-bold mb-10">Contact Us</h2>

        <div className="p-6 border-4 border-brown-700">
          <h3 className="text-white text-3xl font-bold mb-4">Our Location</h3>
          <p className="text-white  text-xl mb-4">123 Algerian Street, Algiers</p>
          <p className="text-white  text-xl mb-4">+213 123 456 789</p>
          <p className="text-white text-xl">info@AlgerianRest.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
