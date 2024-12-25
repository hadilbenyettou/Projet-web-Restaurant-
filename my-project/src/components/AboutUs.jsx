function AboutUs() {
    return (
      <section className="bg-white py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-customGreen text-8xl md:text-7xl font-bold leading-tight font-[PlayfairDisplay]">About Us</h1>
            <p className="text-gray-800 text-xl md:text-2xl mt-4 font-light">
              Welcome to <span className="font-semibold">Fork & Spoon</span>, where passion for food meets excellence. 
              We pride ourselves on offering dishes made from the freshest ingredients, inspired by family recipes 
              and cultural traditions. Whether you are here for a quick bite or a special celebration, 
              we strive to make every meal unforgettable.
            </p>
            <p className="text-gray-800 text-xl md:text-2xl mt-4 font-light">
              Our cozy atmosphere and friendly staff are here to create an exceptional dining experience. 
              We believe in bringing people together through great food and hospitality.
            </p>
          </div>
  
          {/* Image Content */}
          <div className="flex justify-center">
            <img
              src="/images/chefs2.jpg"
              alt="Our Team"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    );
  }
  
  export default AboutUs;
  