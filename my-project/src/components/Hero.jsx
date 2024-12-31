const Hero = () => {
  return (
    <section className="bg-cover bg-center h-96 flex items-center justify-center relative" style={{ backgroundImage: "url('/images/fresh.avif')" }}>
      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-5xl font-bold leading-tight font-[PlayfairDisplay] text-customGreen mb-4">
          Welcome to Our Restaurant
        </h2>

        {/* Subtitle or Tagline */}
        <p className="text-xl text-white font-light mb-6">
          Experience the finest flavors in town
        </p>

        {/* Optional: Testimonial or Quote */}
        <blockquote className="mt-8 text-white italic">
          "The best dining experience I’ve ever had!"
        </blockquote>
      </div>
    </section>
  );
};

export default Hero;